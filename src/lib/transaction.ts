import {
  Abi,
  createPublicClient,
  formatEther,
  getAddress,
  http,
  parseEventLogs,
  TransactionReceipt,
} from "viem";
import { CONTRACT_ABI } from "./abi/contract-abi";
import { sepolia } from "viem/chains";
import { getFarcasterUserByAddress } from "./farcaster";
import {
  Game,
  GameMerged,
  PlayerMerged,
  Step,
  UserStats,
  FarcasterUser,
} from "@/lib/zod/types";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://1rpc.io/sepolia"),
});

export const CONTRACT_ADDRESS = "0x5f91D34dCdFfaF3Ce0f3Fa8A5BA35D4e1eFF8780";

export async function getWaitTransactionReceipt(txHash: `0x${string}`) {
  // const publicClient = getPublicClient(chain);
  return await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });
}
export async function getTransactionReceipt(txHash: `0x${string}`) {
  // const publicClient = getPublicClient(chain);
  return await publicClient.getTransactionReceipt({
    hash: txHash,
  });
}

const getGame = async (id: number): Promise<Game> => {
  const game = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getGame",
    args: [BigInt(id)],
  });

  return game as unknown as Game;
};

const getAllGames = async (): Promise<GameMerged[]> => {
  const data = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getAllGames",
  })) as [Game[], Step[]];

  const [games, allSteps] = data;

  const mergedGames = await Promise.all(
    games.map(async (game, index) => {
      let farcasterUserData = null;
      try {
        farcasterUserData = await getFarcasterUserByAddress(
          game.player as `0x${string}`
        );
      } catch (error) {
        console.error("Farcaster user not found for address:", game.player);
        farcasterUserData = {
          fid: -1,
          displayName: "Unknown",
          username: game.player,
          pfp: "https://placehold.co/100x100",
        } as FarcasterUser;
      }
      return {
        ...game,
        steps: allSteps[index] || [],
        farcasterUser: farcasterUserData,
      } as GameMerged;
    })
  );

  const sortedGames = mergedGames.sort(
    (a, b) => Number(b.currentStep) - Number(a.currentStep)
  );

  return sortedGames;
};

const getAllPlayers = async (): Promise<PlayerMerged[]> => {
  const data = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getAllPlayers",
  })) as [`0x${string}`[], UserStats[], number[][]];

  const [addresses, stats, gamesPlayed] = data;

  const mergedPlayers = await Promise.all(
    addresses.map(async (address, index) => {
      return {
        address,
        stats: stats[index],
        gamesPlayed: gamesPlayed[index] || [],
      } as PlayerMerged;
    })
  );

  return mergedPlayers;
};

const getLeaderboard = async (): Promise<PlayerMerged[]> => {
  const players = await getAllPlayers();
  // Create a map of players by address for efficient lookup
  const tmpPlayerMap = new Map(
    players.map((player) => [player.address, player])
  );

  const playerMap = await Promise.all(
    Array.from(tmpPlayerMap.values()).map(async (player) => {
      let farcasterUserData = null;
      try {
        farcasterUserData = await getFarcasterUserByAddress(
          player.address as `0x${string}`
        );
      } catch (error) {
        console.error("Farcaster user not found for address:", player.address);
        farcasterUserData = {
          fid: -1,
          displayName: "Unknown",
          username: player.address,
          pfp: "https://placehold.co/100x100",
        } as FarcasterUser;
      }
      const playerMerged = {
        address: getAddress(player.address),
        stats: player.stats,
        gamesPlayed: player.gamesPlayed,
        farcasterUser: farcasterUserData,
      } as PlayerMerged;

      return playerMerged;
    })
  );

  // Merge players with the same address and sort by bestRound
  const mergedPlayers = playerMap.sort(
    (a, b) => Number(b.stats.bestRound) - Number(a.stats.bestRound)
  );

  return mergedPlayers;
};

const getSubmitMoveParams = async (address: string) => {
  const submitMoveParams = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getSubmitMoveParams",
    args: [address],
  })) as BigInt[];

  return {
    gameId: submitMoveParams[0],
    requiredPayment: submitMoveParams[1],
    currentStep: submitMoveParams[2],
    remainingGames: submitMoveParams[3],
  };
};

const readLogs = async (receipt: TransactionReceipt) => {
  const logs = parseEventLogs({
    abi: CONTRACT_ABI as Abi,
    logs: receipt.logs,
  });
  return logs;
};

const getContractBalance = async () => {
  const balance = await publicClient.getBalance({
    address: CONTRACT_ADDRESS,
  });

  return formatEther(balance);
};

export {
  getGame,
  getAllGames,
  getAllPlayers,
  getLeaderboard,
  getSubmitMoveParams,
  readLogs,
  getContractBalance,
};
