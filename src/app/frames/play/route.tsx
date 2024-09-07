import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getUserDataForFid, UserDataReturnType } from "frames.js";
import {
  FooterStats,
  GameMove,
  UserBanner,
  StreakCounter,
} from "../components";
import {
  getSubmitMoveParams,
  getTransactionReceipt,
  readLogs,
} from "@/lib/transaction";
import { TransactionReceipt } from "viem";

const availableMoves = [
  {
    icon: "🪨",
    text: "rock",
  },
  {
    icon: "📜",
    text: "paper",
  },
  {
    icon: "✂️",
    text: "scissors",
  },
];

const handleRequest = frames(async (ctx) => {
  try {
    if (!ctx.message?.requesterFid) {
      return {
        image: <div tw="w-full h-full flex bg-white px-4">No FID</div>,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="post" target={"/"}>
            Back
          </Button>,
        ],
      };
    }

    const user: UserDataReturnType = await getUserDataForFid({
      fid: ctx.message?.requesterFid,
    });
    console.log("User:", user);
    // const userAddress = await ctx.walletAddress();
    // if (!userAddress) {
    //   return {
    //     image: (
    //       <div tw="w-full h-full flex bg-white px-4">No wallet address</div>
    //     ),
    //     imageOptions: {
    //       aspectRatio: "1:1",
    //     },
    //     buttons: [
    //       <Button action="post" target={"/"}>
    //         Back
    //       </Button>,
    //     ],
    //   };
    // }
    const userAddress = "0xAf22B0CE4B439769579A892457B9fC391bF1BC96";
    const gameParams = await getSubmitMoveParams(userAddress);
    console.log("User address:", userAddress);
    console.log("Game params:", gameParams);
    const move = ctx.url.searchParams.get("move");
    // const currentStep = ctx.url.searchParams.get("currentStep") || "0";
    // const game = ctx.url.searchParams.get("game") || "-1";
    const { gameId, requiredPayment, currentStep, remainingGames } = gameParams;
    const tx = ctx.url.searchParams.get("tx") || undefined;
    console.log("Move:", move, "Step:", currentStep, "Game:", gameId);

    const transactionId: `0x${string}` = (tx ||
      ctx.message.transactionId) as `0x${string}`;
    let transactionReceipt: TransactionReceipt | undefined = undefined;
    let transactionArgs = undefined;
    if (transactionId) {
      console.log("getting information of transaction with id:", transactionId);
      try {
        transactionReceipt = await getTransactionReceipt(transactionId);
      } catch (e) {
        console.error(e);
      }

      console.log("Transaction receipt:", transactionReceipt);
      if (transactionReceipt) {
        if (transactionReceipt.status === "success") {
          const transactionLogs = await readLogs(transactionReceipt);
          transactionArgs = transactionLogs.map((log) => log.args);
          console.log("transactionArgs:", transactionArgs);
        } else if (transactionReceipt.status === "reverted") {
          console.log("Transaction reverted");
        }
      } else {
        console.log(
          "No transaction found with id:",
          transactionId,
          " -> loading..."
        );

        return {
          image: (
            <div
              style={{
                fontFamily: "BRSonoma-Regular",
              }}
              tw="w-full h-full flex bg-white px-4"
            >
              <UserBanner user={user} />
              <StreakCounter count={Number(currentStep) - 1} />

              <div tw="flex flex-col items-center w-full mt-[200px]">
                <div tw="flex flex-col items-center w-full">
                  <h1
                    tw="text-[150px] text-center"
                    style={{
                      fontFamily: "BagelFatOne-Regular",
                    }}
                  >
                    Loading...
                  </h1>
                  <div tw="flex flex-col justify-center items-center mt-4 w-full">
                    <p tw="text-[40px] text-center my-2">
                      Sepolia is generiting a random move... 🎲
                    </p>
                    <p tw="text-[40px] text-center my-2">
                      Cross your fingers and wait for the result! 🤞
                    </p>
                  </div>
                </div>
                <FooterStats
                  perc_winning={14.56}
                  remaining_games={Number(remainingGames)}
                />
              </div>
            </div>
          ),
          imageOptions: {
            aspectRatio: "1:1",
          },
          buttons: [
            <Button action="post" key="1" target={"/"}>
              Back
            </Button>,
            <Button
              action="post"
              key="3"
              target={`/play?move=${move}&tx=${transactionId}`}
            >
              Refresh 🔄
            </Button>,
          ],
        };
      }
    }

    let result: "win" | "lose" | "draw" | undefined = undefined;
    let contractMove: number | undefined = undefined;
    let contractMoveConverted: string | undefined = undefined;
    if (move) {
      console.log("User move:", move);
      contractMove = (transactionArgs?.[0] as any).contractMove;

      console.log("Contract move (number):", contractMove);
      // map contract move on rock, paper, scissors
      if (contractMove === 0) {
        contractMoveConverted = "rock";
      } else if (contractMove === 1) {
        contractMoveConverted = "paper";
      } else if (contractMove === 2) {
        contractMoveConverted = "scissors";
      }
      console.log("Contract move (converted):", contractMoveConverted);

      result = "lose";
      if (move === contractMoveConverted) {
        result = "draw";
      } else if (
        (move === "rock" && contractMoveConverted === "scissors") ||
        (move === "paper" && contractMoveConverted === "rock") ||
        (move === "scissors" && contractMoveConverted === "paper")
      ) {
        result = "win";
      }

      console.log("Result:", result);
    }

    return {
      image: (
        <div
          style={{
            fontFamily: "BRSonoma-Regular",
          }}
          tw="w-full h-full flex bg-white px-4"
        >
          <UserBanner user={user} />
          <StreakCounter count={Number(currentStep) - 1} />
          {/* here I would like to create an UI with the title "Choose your move" and below three boxes with the available moves (rock, paper, scissors).
          then a counter with the number of plays that returned a positive result and the UserBanner taken from ./components.
          The page isn't dynamic, so I don't want buttons but only boxes showing user the moves */}

          <div tw="flex flex-col items-center w-full mt-[200px]">
            {move && result && contractMoveConverted ? (
              <div tw="flex flex-col items-center w-full">
                <h1 tw="text-6xl text-center">
                  {result === "win"
                    ? "You win!"
                    : result === "lose"
                      ? "You lose!"
                      : "It's a draw!"}
                </h1>
                <div tw="flex justify-center mt-4 w-full justify-around">
                  <div tw="flex flex-col">
                    Your move
                    <GameMove
                      icon={
                        move === "rock" ? "🪨" : move === "paper" ? "📜" : "✂️"
                      }
                      text={move}
                    />
                  </div>
                  <div tw="flex flex-col">
                    Bot move
                    <GameMove
                      icon={
                        contractMoveConverted === "rock"
                          ? "🪨"
                          : contractMoveConverted === "paper"
                            ? "📜"
                            : "✂️"
                      }
                      text={contractMoveConverted}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div tw="flex flex-col items-center w-full">
                <h1
                  style={{
                    fontFamily: "BagelFatOne-Regular",
                  }}
                  tw="text-[90px] text-center"
                >
                  Choose your move
                </h1>
                <h2
                  style={{
                    fontFamily: "BagelFatOne-Regular",
                  }}
                  tw="text-[40px] text-center my-2"
                >
                  Round {currentStep?.toString()}
                </h2>
                <div tw="flex justify-center mt-4 w-full justify-between">
                  {availableMoves.map((move) => (
                    <GameMove icon={move.icon} text={move.text} />
                  ))}
                </div>
              </div>
            )}
            <FooterStats
              perc_winning={14.56}
              remaining_games={Number(remainingGames)}
            />
          </div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" key="1" target={"/"}>
          Back
        </Button>,
        !move ? (
          <Button
            action="tx"
            key="2"
            target={`/tx/move?move=rock&currentStep=${currentStep}&gameId=${gameId}&requiredPayment=${requiredPayment?.toString()}`}
            post_url={`/play?move=rock`}
          >
            Rock 🪨
          </Button>
        ) : undefined,
        !move ? (
          <Button
            action="tx"
            key="3"
            target={`/tx/move?move=paper&currentStep=${currentStep}&gameId=${gameId}&requiredPayment=${requiredPayment?.toString()}`}
            post_url={`/play?move=paper`}
          >
            Paper 📜
          </Button>
        ) : undefined,
        !move ? (
          <Button
            action="tx"
            key="4"
            target={`/tx/move?move=scissors&currentStep=${currentStep}&gameId=${gameId}&requiredPayment=${requiredPayment?.toString()}`}
            post_url={`/play?move=scissors`}
          >
            Scissors ✂️
          </Button>
        ) : undefined,
        move && result != "win" ? (
          <Button action="post" key="2" target={"/play"}>
            Play again 🔄
          </Button>
        ) : undefined,
        move && result != "win" ? (
          <Button action="post" key="3" target={"/leaderboard"}>
            Leaderboard
          </Button>
        ) : undefined,
        move && result === "win" ? (
          <Button action="post" key="2" target={"/play"}>
            Next round 🎉
          </Button>
        ) : undefined,
      ],
    };
  } catch (error) {
    console.error(error);
    return {
      image: <div tw="w-full h-full flex bg-white px-4">Generic error</div>,
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" target={"/"}>
          Back
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
