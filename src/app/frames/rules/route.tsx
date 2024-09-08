import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { getContractBalance } from "@/lib/transaction";

const handleRequest = frames(async (ctx) => {
  const prizePoolBalance = await getContractBalance();

  return {
    image: (
      <div
        style={{
          fontFamily: "BRSonoma-Regular",
        }}
        tw="w-full h-full flex bg-white px-4"
      >
        <div tw="flex flex-col items-center w-full mt-4">
          <h1
            tw="text-8xl text-center"
            style={{
              fontFamily: "BagelFatOne-Regular",
            }}
          >
            Rules & Info
          </h1>
          {/* 
            generate below a paragraph where you explain the game and the rules:
            - what is the game about
            - how to play
            - how to win
            - when the game ends
            - how to check the leaderboard
            - how to check the pool

            here there is a long description of the game:
            Milionario is a decentralized version of the game 1in1 Million where the user has to win 13 plays in a row to be the 1 in 1 million winner.
            The game is played with the classic Rock, Paper, Scissors, and it is played in a Farcaster frame and to win the user has to win 13 games in a row (draws are not counted as wins and will reset the user's streak).
            The game will end when a user wins 13 games in a row.
            To start playing the user has to pay a fee of 0.015 ETH Sepolia that will be added to the pool and he will be able to play 5 games.
            The user will get a reward every time he reaches 6, 9, and 13 wins in a row from the pool.
            The frame's leaderboard will show the top 3 players with the highest streaks and win rates.

            Generate a super short summery of these rules!
           */}
          <p tw="flex flex-col text-4xl mt-4 w-[960px]">
            <span tw="mb-4">
              Milionario is a decentralized version of the game 1in1 Million
              where the user has to win 13 plays in a row to be the 1 in 1
              million winner.
            </span>
            <span tw="mb-4">
              Draws are not counted as wins and will reset the user's streak 🚨
            </span>
            <span tw="mb-4">
              The game will end when a user wins 13 games in a row.
            </span>
            <span tw="mb-4">
              To start playing the user has to pay a fee of 0.015 ETH Sepolia
              that will be added to the pool and he will be able to play 5
              games.
            </span>
            <span tw="mb-0">
              The user will get a reward every time he reaches 6, 9, and 13 wins
              in a row from the pool.
            </span>
          </p>
          <p
            tw="text-[42px] text-center mt-2 mb-0 top-4"
            style={{
              fontFamily: "BRSonoma-Bold",
            }}
          >
            🏆 Prize Pool 🏆
          </p>
          <p
            tw="text-[120px] text-center my-0"
            style={{
              fontFamily: "BagelFatOne-Regular",
            }}
          >
            {prizePoolBalance} ETH
          </p>
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
      <Button action="link" key="2" target={"https://a-milly.vercel.app"}>
        Check site 🔎
      </Button>,
      <Button action="link" key="2" target={"https://builders.garden"}>
        Builders Garden 🌳
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
