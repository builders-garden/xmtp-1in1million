import { Abi, encodeFunctionData, parseEther } from "viem";
import { frames } from "@/app/frames/frames";
import { transaction } from "frames.js/core";
import { sepolia } from "viem/chains";
import { CONTRACT_ABI } from "@/lib/abi/contract-abi";
import { CONTRACT_ADDRESS } from "@/lib/transaction";

enum GameMoves {
  rock = "rock",
  paper = "paper",
  scissors = "scissors",
}

export const POST = frames(async (ctx) => {
  if (!ctx?.message) {
    throw new Error("Invalid frame message");
  }

  const userMove = ctx.url.searchParams.get("move");
  const gameId = ctx.url.searchParams.get("gameId");
  const requiredPayment = ctx.url.searchParams.get("requiredPayment");
  console.log({
    userMove,
    gameId,
    requiredPayment,
  });

  // Validation
  if (gameId == null) {
    throw new Error("Invalid game id");
  }

  if (requiredPayment == null) {
    throw new Error("Invalid payment");
  }

  // check if userMove is valid
  if (!userMove || !Object.values(GameMoves).includes(userMove as GameMoves)) {
    throw new Error("Invalid move");
  }

  // get number from userMove enum
  const userMoveNumber = Object.keys(GameMoves).indexOf(userMove);
  console.log("user move:", userMove, userMoveNumber);

  const calldata = encodeFunctionData({
    abi: CONTRACT_ABI,
    functionName: "submitMove",
    args: [BigInt(gameId), userMoveNumber],
  });

  return transaction({
    chainId: `eip155:${sepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: CONTRACT_ABI as Abi,
      to: CONTRACT_ADDRESS,
      data: calldata,
      value: requiredPayment,
    },
  });
});
