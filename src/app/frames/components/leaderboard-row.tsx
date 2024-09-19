import { PlayerMerged } from "@/lib/zod/types";

interface LeaderboardRowProps {
  player: PlayerMerged;
}

const LeaderboardRow = ({ player }: LeaderboardRowProps) => {
  const pfp = player.farcasterUser?.fid != -1 ? player.farcasterUser?.pfp : "";
  const displayName =
    player.farcasterUser?.displayName &&
    player.farcasterUser.displayName.length > 14
      ? `${player.farcasterUser?.displayName.slice(0, 10)}...`
      : player.farcasterUser?.displayName;
  const username =
    player.farcasterUser?.fid != -1
      ? player.farcasterUser?.username &&
        player.farcasterUser?.username?.length > 14
        ? `${player.farcasterUser?.username.slice(0, 6)}...${player.farcasterUser?.username.slice(-4)}`
        : player.farcasterUser?.username
      : `${player.address.slice(0, 6)}...${player.address.slice(-4)}`;

  return (
    <div tw="flex justify-between my-4">
      <p tw="text-[38px] items-center m-0 p-0">
        {pfp ? (
          <img
            src={pfp}
            tw="w-[48px] h-[48px]"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="48"
            height="48"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <div tw="flex flex-col ml-4 w-[250px]">
          <span
            style={{
              fontFamily: "BRSonoma-Bold",
            }}
          >
            {displayName}
          </span>
          <span tw="text-[28px]">{username}</span>
        </div>
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        tw="h-[78px] w-[250px] text-[38px] items-center m-0 p-0"
      >
        {player.stats.gamesWon.toString()}
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        tw="h-[78px] w-[300px] text-[38px] items-center m-0 p-0"
      >
        {player.stats.bestRound}
      </p>
    </div>
  );
};

export { LeaderboardRow };
