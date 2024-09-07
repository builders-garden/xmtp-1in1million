import { z } from "zod";

const MoveSchema = z.enum(["ROCK", "PAPER", "SCISSORS"]);
type Move = z.infer<typeof MoveSchema>;

const GameStateSchema = z.enum(["IN_PROGRESS", "PLAYER_WON", "PLAYER_LOST"]);
type GameState = z.infer<typeof GameStateSchema>;

const StepSchema = z.object({
  id: z.bigint(),
  playerMove: MoveSchema,
  contractMove: MoveSchema,
  result: z.boolean(),
});
type Step = z.infer<typeof StepSchema>;

const GameSchema = z.object({
  id: z.bigint(),
  player: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  currentStep: z.number(),
  state: GameStateSchema,
  steps: z.array(z.bigint()),
});
type Game = z.infer<typeof GameSchema>;

const UserStatsSchema = z.object({
  gamesWon: z.bigint(),
  gamesLost: z.bigint(),
  bestRound: z.number(),
  totalSpent: z.bigint(),
  totalWon: z.bigint(),
});
type UserStats = z.infer<typeof UserStatsSchema>;

const FarcasterUserSchema = z.object({
  fid: z.number(),
  username: z.string(),
  displayName: z.string(),
  pfp: z.string(),
});
type FarcasterUser = z.infer<typeof FarcasterUserSchema>;

const GameMergedSchema = GameSchema.omit({ steps: true }).extend({
  steps: z.array(StepSchema),
  farcasterUser: FarcasterUserSchema.nullable(),
});
type GameMerged = z.infer<typeof GameMergedSchema>;

const PlayerMergedSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  farcasterUser: FarcasterUserSchema.nullable(),
  stats: UserStatsSchema,
  gamesPlayed: z.array(z.number()),
});
type PlayerMerged = z.infer<typeof PlayerMergedSchema>;

export {
  MoveSchema,
  GameStateSchema,
  StepSchema,
  GameSchema,
  UserStatsSchema,
  GameMergedSchema,
  FarcasterUserSchema,
  PlayerMergedSchema,
};

export type {
  Move,
  GameState,
  Step,
  Game,
  UserStats,
  GameMerged,
  FarcasterUser,
  PlayerMerged,
};
