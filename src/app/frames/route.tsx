import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { CheScoppiatiTag } from "./components/che-scoppiati-tag";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "BRSonoma-Regular",
        }}
        tw="justify-center items-center"
      >
        <h1
          style={{
            fontFamily: "BagelFatOne-Regular",
          }}
          tw="text-[160px] my-2"
        >
          Milionario
        </h1>
        <h2
          style={{
            fontFamily: "BagelFatOne-Regular",
          }}
          tw="text-[80px] mt-0 mb-8"
        >
          1 in 1 Million
        </h2>
        <p tw="text-[140px] my-2">🪨 📜 ✂️</p>
        <p tw="text-[40px] my-2">Let the game begin!</p>
        <CheScoppiatiTag />
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="link" target={"https://a-milly.vercel.app"}>
        Check the Pool
      </Button>,
      <Button action="post" target={"/rules"}>
        Rules & Info
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
