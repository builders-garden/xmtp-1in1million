import { formatEther } from "viem";

interface FooterStatsProps {
  remaining_games: number;
  requiredPayment: number;
}

const FooterStats = ({
  remaining_games,
  requiredPayment,
}: FooterStatsProps) => {
  return (
    <div tw="flex w-full h-[78px] absolute bottom-[15px] items-center justify-between">
      <p tw="text-[30px]">Remaining Games: {remaining_games}</p>
      {requiredPayment > 0 && (
        <p tw="text-[30px]">
          You are going to pay {formatEther(BigInt(requiredPayment))} ETH
        </p>
      )}
    </div>
  );
};

export { FooterStats };
