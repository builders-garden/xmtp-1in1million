import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getUserDataForFid, UserDataReturnType } from "frames.js";
import { Leaderboard, UserBanner } from "../components";

const handleRequest = frames(async (ctx) => {
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

  // leaderboardUsers is an array of objects with type UserDataReturnType and an additional wins property
  const leaderboardUsers: (UserDataReturnType & {
    wins: number;
    bestRound: number;
  })[] = [];

  for (let i = 0; i < 5; i++) {
    leaderboardUsers.push({
      ...(await getUserDataForFid({ fid: i + 10 })),
      // generate random wins and bestRound for each user in the leaderboard from 1 to 100
      wins: Math.floor(Math.random() * 100) + 1,
      bestRound: Math.floor(Math.random() * 100) + 1,
    });
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
      <Button
        action="link"
        target={
          "https://github.com/builders-garden/open-frames-starter-framesjs"
        }
      >
        Check the Pool
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
      <Button action="post" target={"/play"}>
        Play
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
