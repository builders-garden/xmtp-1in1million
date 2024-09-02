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

    return {
      image: (
        <div tw="w-full h-full flex bg-[#c9c9c9] px-4">
          <UserBanner user={user} />
          <WinsCounter count={0} />
          <div tw="flex flex-col items-center w-full mt-[200px]">
            <h1 tw="text-6xl text-center">You Win</h1>
            <div tw="flex justify-center mt-4 w-full justify-between">
              <div tw="w-[330px] h-[330px] bg-white rounded-3xl flex justify-center items-center">
                <div tw="flex flex-col">
                  <p tw="text-[160px] m-0">🎉</p>
                  <p tw="text-[40px] text-center mx-auto">Congratulations!</p>
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
        <Button action="post" key="3" target={"/retry"}>
          Retry 🔄
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
