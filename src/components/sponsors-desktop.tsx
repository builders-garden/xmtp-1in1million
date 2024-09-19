import Image from "next/image";

const SponsorsDesktop = () => {
  const width = 180;
  const height = 100;
  const logos = [
    { src: "/images/xmtp-logo.png", alt: "XMTP logo" },
    { src: "/images/chainlink-logo.png", alt: "Chainlink logo" },
    { src: "/images/web3auth-logo.png", alt: "Web3Auth logo" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <h2 className="text-4xl font-bagel">Powered by</h2>
      <div className="flex items-center justify-center gap-12">
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={width}
            height={height}
          />
        ))}
      </div>
    </div>
  );
};

export default SponsorsDesktop;
