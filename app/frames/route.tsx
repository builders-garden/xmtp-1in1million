import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>1 in 1 Million</h1>
        <h2>Rock Paper Scissors</h2>
        Let the game begin!
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
      <Button action="post" target={"/leaderboard"}>
        Leaderboard
      </Button>,
      <Button action="post" target={"/play"}>
        Play
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
