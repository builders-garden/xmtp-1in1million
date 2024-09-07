interface FooterStatsProps {
  perc_winning: number;
  // wins_to_next_reward: number;
  remaining_games: number;
}

const FooterStats = ({
  perc_winning,
  // wins_to_next_reward,
  remaining_games,
}: FooterStatsProps) => {
  return (
    <div tw="flex w-full h-[78px] absolute bottom-[15px] items-center justify-between">
      {/* <p tw="text-[30px]">% of winning: {perc_winning}%</p> */}
      {/* <p tw="text-[30px]">Wins to the next reward: {wins_to_next_reward}</p> */}
      <p tw="text-[30px]">Remaining games: {remaining_games}</p>
    </div>
  );
};

export { FooterStats };
