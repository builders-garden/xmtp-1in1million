import { kv } from "@vercel/kv";

export type REQUEST_STATUS = "success" | "error" | "loading";

export const storeGameResultObject = async (
  id: number,
  status: REQUEST_STATUS,
  error?: string,
  contractMove?: number,
  stepResult?: boolean,
  playerReward?: string, // how much the player won
  gameId?: string
) => {
  await kv.set(`request/${id}`, {
    createdAt: new Date().toISOString(),
    status,
    error,
    contractMove,
    stepResult,
    playerReward,
    gameId,
  });
  return id;
};

export const deleteGameResultObject = async (id: string) => {
  await kv.del(`request/${id}`);
};

export const getGameResultObject = async (
  id: string
): Promise<{
  status: REQUEST_STATUS;
  error?: string;
  contractMove?: number;
  stepResult?: boolean;
  playerReward?: string; // how much the player won
  gameId?: string;
  createdAt?: string;
} | null> => {
  return await kv.get(`request/${id}`);
};
