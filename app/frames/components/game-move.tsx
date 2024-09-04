interface GameMoveProps {
  icon: string;
  text: string;
}

const GameMove = ({ icon, text }: GameMoveProps) => {
  return (
    <div tw="flex flex-col">
      <div tw="w-[330px] h-[330px] bg-amber-100 rounded-3xl flex justify-center items-center">
        <div tw="flex flex-col">
          <p tw="text-[160px] m-0">{icon}</p>
          <p tw="text-[40px] text-center mx-auto">{text}</p>
        </div>
      </div>
    </div>
  );
};

export { GameMove };
