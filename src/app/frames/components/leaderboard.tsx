import { LeaderboardRow } from ".";
import { PlayerMerged } from "@/lib/zod/types";

interface LeaderboardProps {
  leaderboardUsers: PlayerMerged[];
}

const Leaderboard = ({ leaderboardUsers }: LeaderboardProps) => {
  return (
    <div tw="flex flex-col justify-center w-[850px] bg-amber-100 border-2 border-amber-600 rounded-3xl p-[30px]">
      <div
        style={{
          fontFamily: "BRSonoma-Bold",
        }}
        tw="flex justify-between text-[38px]"
      >
        <p tw="h-[48px] w-[360px] m-0 p-0">User</p>
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
          tw="h-[48px] w-[300px] m-0 p-0"
        >
          Best Round
        </p>
      </div>
      <hr tw="w-full h-[1px] bg-amber-600 my-4" />
      {leaderboardUsers.map((user, index) => (
        <LeaderboardRow key={index} player={user} />
      ))}
    </div>
  );
};

export { Leaderboard };
