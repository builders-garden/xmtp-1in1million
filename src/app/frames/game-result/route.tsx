import { frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";
import { Logger } from "@/lib/logger";
import { appUrl } from "@/lib/utils";
import { getGameResultObject } from "@/lib/kv";
import { GameMove, StreakCounter, UserBanner } from "../components";
import { getUserDataForFid, UserDataReturnType } from "frames.js";

const logger = new Logger("frames/game-result");

const handleRequest = frames(async (ctx) => {
  try {
    // FIRST CASE: the user has just executed the transaction => id == UNDEFINED, status == "start", transactionId == 0xstring
    // SECOND CASE: tx result is not ready yet => id is DEFINED, status is "start"
    // THIRD CASE: tx result is ready => id is DEFINED, status is "success"
    const id = ctx.url.searchParams.get("id");
    const status = ctx.url.searchParams.get("status");
    const move = ctx.url.searchParams.get("move");
    const currentStep = ctx.url.searchParams.get("currentStep");
    const transactionId = ctx.message?.transactionId;
    logger.log(
      `id: ${id}, status: ${status}, move: ${move}, transactionId: ${transactionId}`
    );

    // CASE: !id && !transactionId => ERROR
    if (!id && !transactionId) {
      logger.error("Missing id and transactionId");
      throw new Error("TODO: Missing id and transactionId");
    }

    if (status === "start") {
      const res = await fetch(`${appUrl()}/api/game-result-task`, {
        method: "POST",
        headers: {
          "x-secret": process.env.SECRET!,
        },
        body: JSON.stringify({
          id: transactionId || id,
        }),
      });

      if (!res.ok) {
        console.log(res);
        throw new Error("Failed to get task result");
      }
    }

    const gameResult = await getGameResultObject(id!);

    if (gameResult?.status === "error") {
      logger.error(`Error processing GameResultTask: ${id}`);
      throw new Error("TODO: Show error message");
    }

    if (gameResult === null || gameResult.status === "loading") {
      logger.log(`GameResultTask ${id} still loading`);
      return {
        image: (
          <div
            style={{
              fontFamily: "BRSonoma-Regular",
            }}
            tw="w-full h-full flex bg-white px-4"
          >
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
            </div>
          </div>
        ),
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="post" key="1" target={"/"}>
            Home 🏠
          </Button>,
          <Button
            action="post"
            key="2"
            target={`/game-result?move=${move}&id=${transactionId || id}&currentStep=${currentStep}`}
          >
            Refresh 🔄
          </Button>,
        ],
      };
    }

    if (move === null) {
      logger.error("Missing move");
      throw new Error("TODO: Missing move");
    }

    const { contractMove, stepResult, playerReward, gameId } = gameResult;
    let result: "win" | "lose" | "draw" = "lose";
    let contractMoveConverted: "rock" | "paper" | "scissors" | undefined =
      undefined;

    console.log("Contract move (number):", contractMove);
    // map contract move on rock, paper, scissors
    switch (contractMove) {
      case 0:
        contractMoveConverted = "rock";
        break;
      case 1:
        contractMoveConverted = "paper";
        break;
      case 2:
        contractMoveConverted = "scissors";
        break;
      default:
        throw new Error("Invalid contract move");
    }
    console.log("Contract move (converted):", contractMoveConverted);

    if (move === contractMoveConverted) {
      result = "draw";
    } else if (
      (move === "rock" && contractMoveConverted === "scissors") ||
      (move === "paper" && contractMoveConverted === "rock") ||
      (move === "scissors" && contractMoveConverted === "paper")
    ) {
      result = "win";
    }

    const userAddress = await ctx.walletAddress();
    let user: UserDataReturnType & { fid: number };
    if (!ctx.message?.requesterFid) {
      user = {
        displayName: "Unkown",
        fid: -1,
        username: userAddress,
      };
    } else {
      const tmp = await getUserDataForFid({
        fid: ctx.message?.requesterFid,
      });
      user = {
        ...tmp,
        fid: ctx.message?.requesterFid,
      };
    }
    // POST: Game result is ready, show if the user has won or lost in this step
    return {
      image: (
        <div
          style={{
            fontFamily: "BRSonoma-Regular",
          }}
          tw="w-full h-full flex bg-white px-4"
        >
          <UserBanner user={user} />
          <StreakCounter count={Number(currentStep)} />
          <div tw="flex flex-col items-center w-full mt-[200px]">
            <div tw="flex flex-col items-center w-full">
              <h1
                tw="text-8xl text-center"
                style={{
                  fontFamily: "BagelFatOne-Regular",
                }}
              >
                {result === "win"
                  ? "You Win 🎉"
                  : result === "lose"
                    ? "You Lost 💀"
                    : "It's a Draw!"}
              </h1>
              <div tw="flex justify-center mt-4 w-full justify-around">
                <div tw="flex flex-col">
                  <p tw="mt-0 m-auto mb-4">You</p>
                  <GameMove
                    icon={
                      move === "rock" ? "🪨" : move === "paper" ? "📜" : "✂️"
                    }
                    text={move}
                  />
                </div>
                <div tw="flex flex-col">
                  <p tw="mt-0 m-auto mb-4">Bot</p>
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
          </div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" key="1" target={"/"}>
          Home 🏠
        </Button>,
        result != "win" ? (
          <Button action="post" key="2" target={"/play"}>
            Play again 🔄
          </Button>
        ) : undefined,
        result != "win" ? (
          <Button action="post" key="3" target={"/leaderboard"}>
            Leaderboard
          </Button>
        ) : undefined,
        result === "win" ? (
          <Button action="post" key="2" target={"/play"}>
            Next round 🎉
          </Button>
        ) : undefined,
      ],
    };
  } catch (error) {
    console.error(error);
    return {
      image: (
        <div
          style={{
            fontFamily: "BRSonoma-Regular",
          }}
          tw="w-full h-full flex bg-white px-4"
        >
          <div tw="flex flex-col items-center w-full mt-[200px]">
            <div tw="flex flex-col items-center w-full">
              <h1
                tw="text-[150px] text-center"
                style={{
                  fontFamily: "BagelFatOne-Regular",
                }}
              >
                Error
              </h1>
              <div tw="flex flex-col justify-center items-center mt-4 w-full">
                <p tw="text-[40px] text-center my-2">
                  Something went wrong. Please try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button action="post" key="1" target={"/"}>
          Home 🏠
        </Button>,
        <Button action="post" key="2" target={`/play`}>
          Try again 🔄
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
