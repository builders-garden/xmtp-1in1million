import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getUserDataForFid, UserDataReturnType } from "frames.js";
import { UserBanner } from "../components";

const handleRequest = frames(async (ctx) => {
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

  // leaderboardUsers is an array of objects with type UserDataReturnType and an additional wins property
  const leaderboardUsers: (UserDataReturnType & {
    wins: number;
    bestRound: number;
  })[] = [];

  for (let i = 0; i < 5; i++) {
    leaderboardUsers.push({
      ...(await getUserDataForFid({ fid: i + 2 })),
      // generate random wins and bestRound for each user in the leaderboard from 1 to 100
      wins: Math.floor(Math.random() * 100) + 1,
      bestRound: Math.floor(Math.random() * 100) + 1,
    });
  }

  return {
    image: (
      <div tw="w-full h-full flex bg-[#c9c9c9] px-4">
        <UserBanner user={user} />
        <div tw="flex flex-col items-center w-full mt-[200px]">
          <h1
            style={{
              fontFamily: "Inter-Bold",
            }}
            tw="text-6xl text-center"
          >
            Leaderboard 🏆
          </h1>
          <div tw="flex flex-col justify-center w-full bg-[#565656] rounded-3xl p-[30px] text-white">
            <div
              style={{
                fontFamily: "Inter-Bold",
              }}
              tw="flex justify-between text-[38px]"
            >
              <p tw="h-[48px] w-[400px] m-0 p-0">User</p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                tw="h-[48px] w-[250px] m-0 p-0"
              >
                Wins
              </p>
              <p
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                tw="h-[48px] w-[250px] m-0 p-0"
              >
                Best Round
              </p>
            </div>
            {leaderboardUsers.map((user, index) => (
              <div tw="flex justify-between w-full my-4" key={index}>
                <p
                  tw="h-[78px] w-[400px] text-[38px] items-center m-0 p-0"
                  style={{ fontFamily: "Inter-Bold" }}
                >
                  <img
                    src={`${user.profileImage || ""}`}
                    alt={`${user.displayName} profile image`}
                    tw="w-[78px] h-[78px] rounded-full"
                  />
                  <span tw="ml-4">
                    {user.username && user.username?.length > 14
                      ? `${user.username.slice(0, 10)}...`
                      : user.username}
                  </span>
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  tw="h-[78px] w-[250px] text-[38px] items-center m-0 p-0"
                >
                  {user.wins}
                </p>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  tw="h-[78px] w-[250px] text-[38px] items-center m-0 p-0"
                >
                  {user.bestRound}
                </p>
              </div>
            ))}
          </div>
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
        Back
      </Button>,
      <Button action="post" target={"/play"}>
        Play
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
