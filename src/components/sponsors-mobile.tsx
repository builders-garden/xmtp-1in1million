"use client";

import Image from "next/image";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const SponsorsMobile = () => {
  const width = 180;
  const height = 100;
  const logos = [
    { src: "/images/xmtp-logo.png", alt: "XMTP logo" },
    { src: "/images/chainlink-logo.png", alt: "Chainlink logo" },
    { src: "/images/web3auth-logo.png", alt: "Web3Auth logo" },
  ];

  const x = useMotionValue(0);
  const controls = useAnimationControls();

  const containerWidth = logos.length * width + (logos.length - 1) * 16; // 16 is the gap

  useEffect(() => {
    const animation = controls.start({
      x: [(-9 * containerWidth) / 10, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    });

    return () => {
      animation.then((result) => result && result.stop());
    };
  }, [controls, containerWidth]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-5 sm:py-10">
      <h2 className="text-4xl font-bagel">Powered by</h2>
      <div className="w-full overflow-hidden sm:w-auto">
        <motion.div
          className="flex flex-row items-center justify-start gap-4 sm:gap-12"
          style={{ x }}
          animate={controls}
          drag="x"
          dragConstraints={{
            left: -containerWidth,
            right: 0,
          }}
          onDrag={() => controls.stop()}
          onDragEnd={() => {
            controls.start({
              x: x.get(),
              transition: {
                duration: 0,
              },
            });
            controls.start({
              x: [x.get(), x.get() - containerWidth],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 15,
                  ease: "linear",
                },
              },
            });
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={width}
              height={height}
              className="flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorsMobile;
