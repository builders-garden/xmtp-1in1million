export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "gameId",
        type: "uint64",
      },
    ],
    name: "GameOver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "required",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "provided",
        type: "uint256",
      },
    ],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int64",
        name: "gameId",
        type: "int64",
      },
    ],
    name: "InvalidGameId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "move",
        type: "uint8",
      },
    ],
    name: "InvalidMove",
    type: "error",
  },
  {
    inputs: [],
    name: "LastGameNotOver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "gameId",
        type: "uint64",
      },
    ],
    name: "NotYourGame",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyVRFWrapperCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "UnexpectedPayment",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payment",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "gameId",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "enum MilionarioManager.Move",
        name: "contractMove",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "stepResult",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "playerReward",
        type: "uint256",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "numWords",
        type: "uint32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum MilionarioManager.Move",
        name: "contractMove",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "stepResult",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "playerReward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "gameId",
        type: "uint64",
      },
    ],
    name: "StepCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_GAMES_PER_SESSION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_STEPS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_1",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_2",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARD_3",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SESSION_COST",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STEPS_VRF",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STEPS_WIN_1",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STEPS_WIN_2",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "callbackGasLimit",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint64",
        name: "id",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "currentStep",
        type: "uint8",
      },
      {
        internalType: "enum MilionarioManager.GameState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gamesCounter",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllGames",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "currentStep",
            type: "uint8",
          },
          {
            internalType: "enum MilionarioManager.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint64[]",
            name: "steps",
            type: "uint64[]",
          },
        ],
        internalType: "struct MilionarioManager.Game[]",
        name: "",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "enum MilionarioManager.Move",
            name: "playerMove",
            type: "uint8",
          },
          {
            internalType: "enum MilionarioManager.Move",
            name: "contractMove",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "result",
            type: "bool",
          },
        ],
        internalType: "struct MilionarioManager.Step[][]",
        name: "",
        type: "tuple[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPlayers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "gamesWon",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "gamesLost",
            type: "uint64",
          },
          {
            internalType: "uint8",
            name: "bestRound",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "totalSpent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWon",
            type: "uint256",
          },
        ],
        internalType: "struct MilionarioManager.UserStats[]",
        name: "",
        type: "tuple[]",
      },
      {
        internalType: "uint64[][]",
        name: "",
        type: "uint64[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "_gameId",
        type: "uint64",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "player",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "currentStep",
            type: "uint8",
          },
          {
            internalType: "enum MilionarioManager.GameState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint64[]",
            name: "steps",
            type: "uint64[]",
          },
        ],
        internalType: "struct MilionarioManager.Game",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "id",
            type: "uint64",
          },
          {
            internalType: "enum MilionarioManager.Move",
            name: "playerMove",
            type: "uint8",
          },
          {
            internalType: "enum MilionarioManager.Move",
            name: "contractMove",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "result",
            type: "bool",
          },
        ],
        internalType: "struct MilionarioManager.Step[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkToken",
    outputs: [
      {
        internalType: "contract LinkTokenInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "getRequestStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "getSubmitMoveParams",
    outputs: [
      {
        internalType: "int64",
        name: "gameId",
        type: "int64",
      },
      {
        internalType: "uint256",
        name: "requiredPayment",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "currentStep",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "remainingGames",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_vrfV2PlusWrapper",
    outputs: [
      {
        internalType: "contract IVRFV2PlusWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastRequestId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "linkAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numWords",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerFid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerGamesCounter",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestConfirmations",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requestIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "s_requests",
    outputs: [
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "gameId",
        type: "uint64",
      },
      {
        internalType: "uint8",
        name: "playerMoveInt",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "fulfilled",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "stepResult",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "playerReward",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "steps",
    outputs: [
      {
        internalType: "uint64",
        name: "id",
        type: "uint64",
      },
      {
        internalType: "enum MilionarioManager.Move",
        name: "playerMove",
        type: "uint8",
      },
      {
        internalType: "enum MilionarioManager.Move",
        name: "contractMove",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stepsCounter",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int64",
        name: "_gameId",
        type: "int64",
      },
      {
        internalType: "uint8",
        name: "_playerMoveInt",
        type: "uint8",
      },
    ],
    name: "submitMove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userStats",
    outputs: [
      {
        internalType: "uint64",
        name: "gamesWon",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "gamesLost",
        type: "uint64",
      },
      {
        internalType: "uint8",
        name: "bestRound",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "totalSpent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWon",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "wrapperAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
