import { UserDataReturnType } from "frames.js";
import { LeaderboardRow } from ".";

interface LeaderboardProps {
  leaderboardUsers: (UserDataReturnType & {
    wins: number;
    bestRound: number;
  })[];
}

const Leaderboard = ({ leaderboardUsers }: LeaderboardProps) => {
  return (
    <div tw="flex flex-col justify-center w-full bg-orange-300 rounded-3xl p-[30px]">
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
        <LeaderboardRow key={index} row={user} />
      ))}
    </div>
  );
};

export { Leaderboard };
