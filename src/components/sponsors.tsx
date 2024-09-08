import Image from "next/image";

const Sponsors = () => {
  const width = 180;
  const height = 100;
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <h2 className="text-4xl font-bagel">Powered by</h2>
      <div className="flex items-center justify-center gap-12">
        <Image
          src="/images/xmtp-logo.png"
          alt="XMTP logo"
          width={width}
          height={height}
        />
        <Image
          src="/images/chainlink-logo.png"
          alt="Chainlink logo"
          width={width}
          height={height}
        />
        <Image
          src="/images/web3auth-logo.png"
          alt="Web3Auth logo"
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default Sponsors;
