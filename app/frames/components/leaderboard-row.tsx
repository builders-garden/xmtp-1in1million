import { UserDataReturnType } from "frames.js";

interface UserBannerProps {
  row: UserDataReturnType & { wins: number; bestRound: number };
}

const LeaderboardRow = ({ row }: UserBannerProps) => {
  return (
    <div tw="flex justify-between my-4">
      <p tw="h-[78px] w-[300px] text-[38px] items-center m-0 p-0">
        <img
          src={`${row.profileImage || ""}`}
          alt={`${row.displayName} profile image`}
          tw="w-[78px] h-[78px] rounded-full"
        />
        <span
          style={{
            fontFamily: "BRSonoma-Bold",
          }}
          tw="ml-4"
        >
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
        tw="h-[78px] w-[300px] text-[38px] items-center m-0 p-0"
      >
        {row.bestRound}
      </p>
    </div>
  );
};

export { LeaderboardRow };
