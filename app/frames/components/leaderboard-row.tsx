import { UserDataReturnType } from "frames.js";

interface UserBannerProps {
  row: UserDataReturnType & { wins: number; bestRound: number };
}

const LeaderboardRow = ({ row }: UserBannerProps) => {
  return (
    <div tw="flex justify-between w-full my-4">
      <p
        tw="h-[78px] w-[400px] text-[38px] items-center m-0 p-0"
        style={{ fontFamily: "Inter-Bold" }}
      >
        <img
          src={`${row.profileImage || ""}`}
          alt={`${row.displayName} profile image`}
          tw="w-[78px] h-[78px] rounded-full"
        />
        <span tw="ml-4">
          {row.username && row.username?.length > 14
            ? `${row.username.slice(0, 10)}...`
            : row.username}
        </span>
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        tw="h-[78px] w-[250px] text-[38px] items-center m-0 p-0"
      >
        {row.wins}
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        tw="h-[78px] w-[250px] text-[38px] items-center m-0 p-0"
      >
        {row.bestRound}
      </p>
    </div>
  );
};

export { LeaderboardRow };
