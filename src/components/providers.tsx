"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { WagmiProvider } from "wagmi";
import { Web3AuthContext } from "@/hooks/web3auth-context";
import { wagmiConfig } from "@/lib/wagmiConfig";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const auth = useWeb3Auth();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3AuthContext.Provider value={auth}>
          {children}
        </Web3AuthContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
