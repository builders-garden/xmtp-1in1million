import { Abi, createPublicClient, http } from "viem";
import { CONTRACT_ABI } from "./abi/contract-abi";
import { sepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export const CONTRACT_ADDRESS = "0xFa06c3aF06F7dA33720061C9B23082aEa38C3eFA";

enum Move {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

export enum GameState {
  IN_PROGRESS = "IN_PROGRESS",
  PLAYER_WON = "PLAYER_WON",
  PLAYER_LOST = "PLAYER_LOST",
}

interface Step {
  id: bigint;
  playerMove: Move;
  contractMove: Move;
  result: boolean;
}

interface Game {
  id: bigint;
  player: `0x${string}`; // Ethereum address
  currentStep: number;
  state: GameState;
  steps: bigint[]; // step ids
}

interface UserStats {
  gamesWon: bigint;
  gamesLost: bigint;
  bestRound: number;
  totalSpent: bigint;
  totalWon: bigint;
}

export interface GameMerged extends Omit<Game, "steps"> {
  steps: Step[];
}

export interface PlayerMerged {
  address: `0x${string}`;
  stats: UserStats;
  gamesPlayed: number[];
}

export async function getTransactionReceipt(txHash: `0x${string}`) {
  // const publicClient = getPublicClient(chain);
  publicClient.getTransactionReceipt({
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

  const mergedGames = games.map((game, index) => ({
    ...game,
    steps: allSteps[index] || [],
  })) as GameMerged[];

  return mergedGames;
};

const getAllPlayers = async (): Promise<PlayerMerged[]> => {
  const data = (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getAllPlayers",
  })) as [`0x${string}`[], UserStats[], number[][]];

  const [addresses, stats, gamesPlayed] = data;

  const mergedPlayers = addresses.map((address, index) => ({
    address,
    stats: stats[index],
    gamesPlayed: gamesPlayed[index] || [],
  })) as PlayerMerged[];

  return mergedPlayers;
};

const getLeaderboard = async (): Promise<PlayerMerged[]> => {
  const players = await getAllPlayers();
  return players.sort(
    (a, b) => Number(b.stats.bestRound) - Number(a.stats.bestRound)
  );
};

export { getGame, getAllGames, getAllPlayers, getLeaderboard };
