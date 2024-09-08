"use client";

import { Vortex } from "@/components/ui/vortex";
import { PrizePool } from "@/components/pool";

function createWarpcastIntent(frameUrl: string): string {
  const sharableText = `Gm gamers! Cross your fingers and try your luck to be the 1 in 1 million! 🤞🏼🍀`;
  const sharableTextUriEncoded = encodeURI(sharableText);
  return `https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&embeds%5B%5D=${frameUrl}`;
}

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
              There is a 1 in 1 million chance that you can become a millionaire
              by playing this game.
            </p>
            <PrizePool />
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-200 rounded-xl text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
                onClick={() => {
                  const intentUrl = createWarpcastIntent(
                    "https://a-milly.vercel.app/"
                  );
                  window.open(intentUrl, "_blank");
                }}
              >
                Play Now
              </button>
              <button
                className="px-4 py-2 text-white"
                onClick={() => {
                  window.open("https://youtu.be/GNFNrhv3T9k", "_blank");
                }}
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default Hero;
