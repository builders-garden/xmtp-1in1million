"use client";

import { Vortex } from "@/components/ui/vortex";

const Hero = () => {
  return (
    <div className="w-[calc(100%-4rem)] m-0 w-full rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          A Milly in 1 Million
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          There is a 1 in 1 million chance that you can become a millionaire by
          playing this game.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Play Now
          </button>
          <button className="px-4 py-2  text-white ">Watch Trailer</button>
        </div>
      </Vortex>
    </div>
  );
};

export default Hero;
