import { UserDataReturnType } from "frames.js";

interface WinsCounterProps {
  count?: number;
}

const WinsCounter = ({ count }: WinsCounterProps) => {
  return (
    <div tw="flex w-full h-[78px] absolute top-[15px] right-[15px] justify-end items-center">
      <p
        tw="h-[48px] text-[38px] m-0 p-0 ml-[20px]"
        style={{ fontFamily: "Outfit-Bold" }}
      >
        Wins: {count ?? 0}
      </p>
    </div>
  );
};

export { WinsCounter };
