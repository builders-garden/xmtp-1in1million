"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";
import { Web3AuthContext } from "@/hooks/web3auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const auth = useWeb3Auth();

  return (
    <QueryClientProvider client={queryClient}>
      <Web3AuthContext.Provider value={auth}>
        {children}
      </Web3AuthContext.Provider>
    </QueryClientProvider>
  );
}
