// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ConfirmedOwner} from "@chainlink-contracts-1.2.0/src/v0.8/shared/access/ConfirmedOwner.sol";
import {LinkTokenInterface} from "@chainlink-contracts-1.2.0/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {VRFV2PlusWrapperConsumerBase} from "@chainlink-contracts-1.2.0/src/v0.8/vrf/dev/VRFV2PlusWrapperConsumerBase.sol";
import {VRFV2PlusClient} from "@chainlink-contracts-1.2.0/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

error InvalidMove(uint8 move);
error InvalidGameId(int64 gameId);
error LastGameNotOver();
error InsufficientFunds(uint256 required, uint256 provided);
error UnexpectedPayment();
error NotYourGame(address player, uint64 gameId);
error GameOver(uint64 gameId);
error RequestNotFound(uint256 requestId);

contract MilionarioManager is VRFV2PlusWrapperConsumerBase, ConfirmedOwner {
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(
        uint256 requestId,
        uint256[] randomWords,
        uint256 payment,
        uint64 gameId,
        Move contractMove,
        bool stepResult,
        uint256 playerReward
    );
    event StepCreated(
        Move contractMove,
        bool stepResult,
        uint256 playerReward,
        uint64 gameId
    );

    struct RequestStatus {
        uint256 paid; // amount paid in link
        uint256[] randomWords;
        uint64 gameId;
        uint8 playerMoveInt;
        bool fulfilled; // whether the request has been successfully fulfilled
        bool stepResult;
        uint256 playerReward;
    }
    mapping(uint256 => RequestStatus)
    public s_requests; /* requestId --> requestStatus */

    // past requests Id.
    uint256[] public requestIds;
    uint256 public lastRequestId;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 public callbackGasLimit = 1000000;

    // The default is 3, but you can set this higher.
    uint16 public requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 public numWords = 2;

    // Address LINK - hardcoded for Sepolia
    address public linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address public wrapperAddress = 0x195f15F2d49d693cE265b4fB0fdDbE15b1850Cc1;

    uint8 public constant MAX_GAMES_PER_SESSION = 5;
    uint8 public constant MAX_STEPS = 13;   // == 13, game over
    uint8 public constant STEPS_WIN_1 = 6;  // > 6, withdraw first reward
    uint8 public constant STEPS_WIN_2 = 9;  // > 9, withdraw second reward
    uint8 public constant STEPS_VRF = 6;    // > 6, use VRF
    uint256 public constant SESSION_COST = 0.015 ether;
    
    // percentage of the pool to reward the player
    uint8 public constant REWARD_1 = 10;
    uint8 public constant REWARD_2 = 40;
    uint8 public constant REWARD_3 = 60;

    enum Move {
        ROCK,
        PAPER,
        SCISSORS
    }

    enum GameState {
        IN_PROGRESS,
        PLAYER_WON,
        PLAYER_LOST
    }

    struct Step {
        uint64 id;
        Move playerMove;
        Move contractMove;
        bool result;
    }

    struct Game {
        uint64 id;
        address player;
        uint8 currentStep;
        GameState state;
        uint64[] steps; // step ids
    }

    struct UserStats {
        uint64 gamesWon;
        uint64 gamesLost;
        uint8 bestRound;
        uint256 totalSpent;
        uint256 totalWon;
    }

    uint64 public gamesCounter = 0;
    uint64 public stepsCounter = 0;

    mapping(uint64 => Game) public games;
    mapping(uint64 => Step) public steps;
    mapping(address => string) public playerFid;
    mapping(address => uint64) public playerGamesCounter;
    mapping(address => UserStats) public userStats;

    constructor()
        ConfirmedOwner(msg.sender)
        VRFV2PlusWrapperConsumerBase(wrapperAddress)
    {}

    function requestRandomWords(
        bool enableNativePayment,
        uint64 _gameId,
        uint8 _playerMoveInt
    ) internal returns (uint256) {
        bytes memory extraArgs = VRFV2PlusClient._argsToBytes(
            VRFV2PlusClient.ExtraArgsV1({nativePayment: enableNativePayment})
        );
        uint256 requestId;
        uint256 reqPrice;
        if (enableNativePayment) {
            (requestId, reqPrice) = requestRandomnessPayInNative(
                callbackGasLimit,
                requestConfirmations,
                numWords,
                extraArgs
            );
        } else {
            (requestId, reqPrice) = requestRandomness(
                callbackGasLimit,
                requestConfirmations,
                numWords,
                extraArgs
            );
        }
        s_requests[requestId] = RequestStatus({
            paid: reqPrice,
            randomWords: new uint256[](0),
            gameId: _gameId,
            playerMoveInt: _playerMoveInt,
            fulfilled: false,
            stepResult: false,
            playerReward: 0
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        if (s_requests[_requestId].paid == 0) revert RequestNotFound(_requestId);
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;

        uint64 gameId = s_requests[_requestId].gameId;
        uint8 playerMoveInt = s_requests[_requestId].playerMoveInt;

        (
            Move contractMove,
            bool stepResult,
            uint256 playerReward
        ) = createStep(
            gameId,
            playerMoveInt,
            _randomWords[0]
        );

        s_requests[_requestId].stepResult = stepResult;
        s_requests[_requestId].playerReward = playerReward;

        emit RequestFulfilled(
            _requestId,
            _randomWords,
            s_requests[_requestId].paid,
            gameId,
            contractMove,
            stepResult,
            playerReward
        );
    }

    function getRequestStatus(
        uint256 _requestId
    )
        external
        view
        returns (uint256 paid, bool fulfilled, uint256[] memory randomWords)
    {
        if (s_requests[_requestId].paid == 0) revert RequestNotFound(_requestId);
        RequestStatus memory request = s_requests[_requestId];
        return (request.paid, request.fulfilled, request.randomWords);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(linkAddress);
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    /// @notice withdrawNative withdraws the amount specified in amount to the owner
    /// @param amount the amount to withdraw, in wei
    function withdrawNative(uint256 amount) external onlyOwner {
        (bool success, ) = payable(owner()).call{value: amount}("");
        // solhint-disable-next-line gas-custom-errors
        require(success, "withdrawNative failed");
    }

    event Received(address, uint256);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function createStep(
        uint64 _gameId,
        uint8 _playerMoveInt,
        uint256 _randomNumber
    ) internal returns (Move contractMove, bool result, uint256 playerReward) {
        Game storage game = games[_gameId];

        // Determine player's and contract's moves
        Move playerMove = Move(_playerMoveInt);
        contractMove = Move(uint8(_randomNumber % 3));

        // Determine if the player wins, loses, or it's a draw
        if (
            (playerMove == Move.ROCK && contractMove == Move.SCISSORS) ||
            (playerMove == Move.PAPER && contractMove == Move.ROCK) ||
            (playerMove == Move.SCISSORS && contractMove == Move.PAPER)
        ) {
            result = true; // player wins the step
            userStats[game.player].gamesWon += 1;
        } else {
            result = false; // player loses the step
            userStats[game.player].gamesLost += 1;
            game.state = GameState.PLAYER_LOST;
        }

        // Create the step directly in storage
        Step storage newStep = steps[stepsCounter];
        newStep.id = stepsCounter;
        newStep.playerMove = playerMove;
        newStep.contractMove = contractMove;
        newStep.result = result;

        // Add the step to the game and update game state
        game.steps.push(stepsCounter);
        stepsCounter++;
        game.currentStep++;

        // Check if player won the entire game
        if (game.currentStep > MAX_STEPS && result == true) {
            game.state = GameState.PLAYER_WON; // update game state to PLAYER_WON
        }

        // Update the best round if the currentStep is the highest so far
        if (game.currentStep - 1 > userStats[game.player].bestRound) {
            userStats[game.player].bestRound = game.currentStep - 1;
        }

        // Check if player should receive rewards
        address payable player = payable(game.player);

        if (game.currentStep == STEPS_WIN_1 + 1 && result == true) {
            playerReward = (address(this).balance * REWARD_1) / 100;
        } else if (game.currentStep == STEPS_WIN_2 + 1 && result == true) {
            playerReward = (address(this).balance * REWARD_2) / 100;
        } else if (game.currentStep == MAX_STEPS + 1 && result == true) {
            playerReward = (address(this).balance * REWARD_3) / 100;
        }

        // Transfer reward if applicable and update total won
        if (playerReward > 0) {
            player.transfer(playerReward);
            userStats[game.player].totalWon += playerReward;
        }

        emit StepCreated(contractMove, result, playerReward, _gameId);

        return (contractMove, result, playerReward);
    }

    function submitMove(int64 _gameId, uint8 _playerMoveInt)
        external
        payable
    {
        if (_playerMoveInt >= 3) revert InvalidMove(_playerMoveInt);
        if (_gameId < -1) revert InvalidGameId(_gameId);

        uint64 gameId;
        uint8 currentStep;

        if (_gameId == -1) {
            // Check if the last player's game is over
            if (playerGamesCounter[msg.sender] > 0 &&
                games[playerGamesCounter[msg.sender] - 1].state == GameState.IN_PROGRESS) {
                revert LastGameNotOver();
            }

            uint64 playerGameCounter = playerGamesCounter[msg.sender];

            // Check if payment is required for a new session
            if (playerGameCounter % MAX_GAMES_PER_SESSION == 0) {
                if (msg.value < SESSION_COST) {
                    revert InsufficientFunds(SESSION_COST, msg.value);
                }
                userStats[msg.sender].totalSpent += msg.value; // Update total spent
            } else {
                if (msg.value > 0) revert UnexpectedPayment();
            }

            // create the game
            Game storage game = games[gamesCounter];

            game.id = gamesCounter++; // Increment games counter after initialization
            game.player = msg.sender; // Set the player address
            game.currentStep = 1; // Set the current step
            game.state = GameState.IN_PROGRESS; // Set game state to IN_PROGRESS
            game.steps = new uint64[](0); // Initialize the steps array

            gameId = game.id;
            currentStep = game.currentStep;

            playerGamesCounter[msg.sender]++; // Increment player's game counter
        } else {
            if (uint64(_gameId) >= gamesCounter) revert InvalidGameId(_gameId);

            Game memory game = games[uint64(_gameId)];
            if (game.player != msg.sender) revert NotYourGame(msg.sender, uint64(_gameId));
            if (game.state != GameState.IN_PROGRESS) revert GameOver(uint64(_gameId));

            gameId = game.id;
            currentStep = game.currentStep;
        }

        if (currentStep < STEPS_VRF) {
            // If the game is below the VRF step threshold, generate a random number locally
            uint256 randomNumber = block.prevrandao;
            createStep(gameId, _playerMoveInt, randomNumber);
        } else {
            // If the game has reached the VRF step threshold, request randomness
            requestRandomWords(true, gameId, _playerMoveInt);
        }
    }

    function getGameSteps(uint64 _gameId)
        internal
        view
        returns (Step[] memory)
    {
        // Get the game from memory (not storage, since we are only reading)
        Game memory game = games[_gameId];

        // Create an array to hold all the steps of the game
        Step[] memory gameSteps = new Step[](game.steps.length);

        // Loop through the step IDs and retrieve each Step from the steps mapping
        for (uint256 i = 0; i < game.steps.length; i++) {
            uint64 stepId = game.steps[i];
            gameSteps[i] = steps[stepId];
        }

        return gameSteps;
    }

    function getGame(uint64 _gameId)
        external
        view
        returns (Game memory, Step[] memory)
    {
        Game memory game = games[_gameId];
        Step[] memory gameSteps = getGameSteps(_gameId);
        return (game, gameSteps);
    }

    function getAllGames() external view returns (Game[] memory, Step[][] memory) {
        Game[] memory allGames = new Game[](gamesCounter);
        Step[][] memory allGameSteps = new Step[][](gamesCounter);

        for (uint64 i = 0; i < gamesCounter; i++) {
            Game memory game = games[i];
            allGames[i] = game;
            allGameSteps[i] = getGameSteps(i); // use getGameSteps to retrieve steps for the game
        }

        return (allGames, allGameSteps);
    }

    function getAllPlayers()
        external
        view
        returns (
            address[] memory,
            UserStats[] memory,
            uint64[][] memory
        )
    {
        uint64 totalPlayers = 0;

        // Determine the total number of players
        for (uint64 i = 0; i < gamesCounter; i++) {
            if (playerGamesCounter[games[i].player] > 0) {
                totalPlayers++;
            }
        }

        address[] memory players = new address[](totalPlayers);
        UserStats[] memory stats = new UserStats[](totalPlayers);
        uint64[][] memory gamesPlayed = new uint64[][](totalPlayers);

        uint64 index = 0;

        for (uint64 i = 0; i < gamesCounter; i++) {
            address player = games[i].player;

            // If the player has games, add them to the result set
            if (playerGamesCounter[player] > 0) {
                players[index] = player;
                stats[index] = userStats[player];

                uint64 totalGamesPlayed = playerGamesCounter[player];
                gamesPlayed[index] = new uint64[](totalGamesPlayed);

                for (uint64 j = 0; j < totalGamesPlayed; j++) {
                    gamesPlayed[index][j] = j;  // Add gameId to the player's game list
                }

                index++;
            }
        }

        return (players, stats, gamesPlayed);
    }

    function getSubmitMoveParams(address player)
        public
        view
        returns (
            int64 gameId,
            uint256 requiredPayment,
            uint8 currentStep,
            uint8 remainingGames
        )
    {
        uint64 playerGameCount = playerGamesCounter[player];

        uint8 playerGameCountMod = uint8(playerGameCount % MAX_GAMES_PER_SESSION);
        
        // Calculate remaining games
        if (playerGameCount == 0) {
            remainingGames = 0; // First time user, hasn't paid for a session yet
        } else {
            remainingGames = playerGameCountMod == 0 ? 0 : uint8(MAX_GAMES_PER_SESSION - playerGameCountMod);
        }
        
        // Check if the player has an ongoing game
        if (playerGameCount > 0) {
            uint64 lastGameId = playerGameCount - 1;
            Game memory lastGame = games[lastGameId];
            
            if (lastGame.state == GameState.IN_PROGRESS) {
                return (
                    int64(lastGameId),
                    0,
                    lastGame.currentStep,
                    remainingGames
                );
            }
        }
        
        // If no ongoing game, prepare for a new game
        gameId = -1; // Indicates a new game should be created
        currentStep = 1;
        
        // Calculate required payment
        requiredPayment = (playerGameCountMod == 0) ? SESSION_COST : 0;
        
        return (gameId, requiredPayment, currentStep, remainingGames);
    }
}
