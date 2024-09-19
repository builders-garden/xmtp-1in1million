import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getUserDataForFid, UserDataReturnType } from "frames.js";
import { Leaderboard, UserBanner } from "../components";
import { getLeaderboard } from "@/lib/transaction";

const handleRequest = frames(async (ctx) => {
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
  console.log("User:", user);

  const leaderboardData = await getLeaderboard();
  const leaderboardUsers = leaderboardData.slice(0, 3);

  return {
    image: (
      <div
        style={{
          fontFamily: "BRSonoma-Regular",
        }}
        tw="w-full h-full flex bg-white px-4"
      >
        <UserBanner user={user} />
        <div tw="flex flex-col items-center w-full mt-[100px]">
          <h1
            style={{
              fontFamily: "BagelFatOne-Regular",
            }}
            tw="text-[90px] text-center"
          >
            Leaderboard
          </h1>
          <Leaderboard leaderboardUsers={leaderboardUsers} />
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="link" target={"https://a-milly.vercel.app"}>
        Check the Pool
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
      <Button action="post" target={"/rules"}>
        Rules & Info
      </Button>,
      <Button action="post" target={"/play"}>
        Play
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
