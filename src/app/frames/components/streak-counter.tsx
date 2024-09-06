interface StreakCounterProps {
  count?: number;
}

const StreakCounter = ({ count }: StreakCounterProps) => {
  return (
    <div tw="flex w-full h-[78px] absolute top-[15px] right-[15px] justify-end items-center">
      <p tw="h-[48px] text-[38px] m-0 p-0 ml-[20px]">
        Current Streak: {count ?? 0}
      </p>
    </div>
  );
};

export { StreakCounter };
