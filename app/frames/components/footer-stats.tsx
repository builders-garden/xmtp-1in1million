interface FooterStatsProps {
  perc_winning: number;
  wins_to_next_reward: number;
}

const FooterStats = ({
  perc_winning,
  wins_to_next_reward,
}: FooterStatsProps) => {
  return (
    <div tw="flex w-full h-[78px] absolute bottom-[15px] items-center justify-between">
      <p tw="text-[30px]">% of winning: {perc_winning}%</p>
      <p tw="text-[30px]">Wins to the next reward: {wins_to_next_reward}</p>
    </div>
  );
};

export { FooterStats };
