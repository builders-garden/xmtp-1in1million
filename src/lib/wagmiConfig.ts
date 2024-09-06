import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// https://wagmi.sh/react/typescript#declaration-merging
declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
