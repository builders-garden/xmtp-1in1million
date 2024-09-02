"use client";

import { createContext, useContext } from "react";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

// Create the context with a null initial value
export const Web3AuthContext = createContext<ReturnType<
  typeof useWeb3Auth
> | null>(null);

// Hook to use the Web3Auth context
export const useWeb3AuthContext = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error(
      "useWeb3AuthContext must be used within a Web3AuthProvider"
    );
  }
  return context;
};
