"use client";

import { Vortex } from "@/components/ui/vortex";
import { PrizePool } from "@/components/pool";

const Hero = () => {
  return (
    <div className="m-0 w-full rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 px-40 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-7xl text-center font-bagel">
              A Milly in 1 Million
            </h2>
            <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
              There is a 1 in 1 million chance that you can become a millionaire by
              playing this game.
            </p>
            <PrizePool />
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Play Now
              </button>
              <button className="px-4 py-2 text-white">Watch Trailer</button>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default Hero;
