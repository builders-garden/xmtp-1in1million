import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getUserDataForFid, UserDataReturnType } from "frames.js";
import { FooterStats, UserBanner, WinsCounter } from "../components";

const handleRequest = frames(async (ctx) => {
  try {
    if (!ctx.message?.requesterFid) {
      return {
        image: <div tw="w-full h-full flex bg-[#c9c9c9] px-4">No FID</div>,
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

    const move = ctx.url.searchParams.get("move");

    console.log("User move:", move);

    if (move) {
      const moves = ["rock", "paper", "scissors"];
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      console.log("Random move:", randomMove);

      let result = "lose";
      if (move === randomMove) {
        result = "draw";
      } else if (
        (move === "rock" && randomMove === "scissors") ||
        (move === "paper" && randomMove === "rock") ||
        (move === "scissors" && randomMove === "paper")
      ) {
        result = "win";
      }

      console.log("Result:", result);

      return {
        image: (
          <div tw="w-full h-full flex bg-[#c9c9c9] px-4">
            <UserBanner user={user} />
            <WinsCounter count={0} />
            <div tw="flex flex-col items-center w-full mt-[200px]">
              <h1 tw="text-6xl text-center">
                {result === "win"
                  ? "You Win"
                  : result === "draw"
                  ? "It's a Draw"
                  : "You Lose"}
              </h1>
              <div tw="flex justify-center mt-4 w-full justify-around">
                <div tw="flex flex-col">
                  Your move
                  <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                    <div tw="flex flex-col">
                      <p tw="text-[160px] m-0">
                        {move === "rock"
                          ? "🪨"
                          : move === "paper"
                          ? "📜"
                          : "✂️"}
                      </p>
                      <p tw="text-[40px] text-center mx-auto">{move}</p>
                    </div>
                  </div>
                </div>
                <div tw="flex flex-col">
                  Bot move
                  <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                    <div tw="flex flex-col">
                      <p tw="text-[160px] m-0">
                        {randomMove === "rock"
                          ? "🪨"
                          : randomMove === "paper"
                          ? "📜"
                          : "✂️"}
                      </p>
                      <p tw="text-[40px] text-center mx-auto">{randomMove}</p>
                    </div>
                  </div>
                </div>
              </div>
              <FooterStats perc_winning={14.56} wins_to_next_reward={6} />
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
          <Button action="post" key="2" target={"/leaderboard"}>
            Leaderboard 🏆
          </Button>,
          <Button action="post" key="3" target={"/play"}>
            Retry 🔄
          </Button>,
        ],
      };
    }

    return {
      image: (
        <div tw="w-full h-full flex bg-[#c9c9c9] px-4">
          <UserBanner user={user} />
          <WinsCounter count={0} />
          {/* here I would like to create an UI with the title "Choose your move" and below three boxes with the available moves (rock, paper, scissors).
          then a counter with the number of plays that returned a positive result and the UserBanner taken from ./components.
          The page isn't dynamic, so I don't want buttons but only boxes showing user the moves */}

          <div tw="flex flex-col items-center w-full mt-[200px]">
            <h1 tw="text-6xl text-center">Choose your move</h1>
            <div tw="flex justify-center mt-4 w-full justify-between">
              <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                <div tw="flex flex-col">
                  <p tw="text-[160px] m-0">🪨</p>
                  <p tw="text-[40px] text-center mx-auto">Rock</p>
                </div>
              </div>
              <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                <div tw="flex flex-col">
                  <p tw="text-[160px] m-0">📜</p>
                  <p tw="text-[40px] text-center mx-auto">Paper</p>
                </div>
              </div>
              <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                <div tw="flex flex-col">
                  <p tw="text-[160px] m-0">✂️</p>
                  <p tw="text-[40px] text-center mx-auto">Scissors</p>
                </div>
              </div>
            </div>
            <FooterStats perc_winning={14.56} wins_to_next_reward={6} />
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
        <Button action="post" key="2" target={"/play?move=rock"}>
          Rock 🪨
        </Button>,
        <Button action="post" key="3" target={"/play?move=paper"}>
          Paper 📜
        </Button>,
        <Button action="post" key="4" target={"/play?move=scissors"}>
          Scissors ✂️
        </Button>,
      ],
    };
  } catch (error) {
    console.error(error);
    return {
      image: <div tw="w-full h-full flex bg-[#c9c9c9] px-4">Generic error</div>,
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
