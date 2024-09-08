"use client";

import { useEffect, useState } from "react";
import {
  CHAIN_NAMESPACES,
  IProvider,
  UserInfo,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  OpenloginAdapter,
  OpenloginUserInfo,
} from "@web3auth/openlogin-adapter";
import { Web3Auth } from "@web3auth/modal";
import RPC from "@/lib/viem-rpc";

// get from http\s://dashboard.web3auth.io
const clientId =
  "BI7Z48zXwRKRUZ_u5W-NoVFayLcHtCNuSWCsxEeBUSMe08PoI6CY01Xy9hbs8-qLNlSgeOl6ES_YTtZgzWJlkq4";

// base sepolia
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34", // base sepolia hex of 84532
  rpcTarget: "https://sepolia.base.org",
  displayName: "Base Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.basescan.org/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://raw.githubusercontent.com/base-org/brand-kit/main/logo/symbol/Base_Symbol_Blue.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    network: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    uxMode: "popup",
  },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    loginMethodsOrder: ["farcaster", "google", "apple"],
    primaryButton: "socialLogin",
    mode: "dark",
  },
});

web3auth.configureAdapter(openloginAdapter);

export const useWeb3Auth = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Partial<OpenloginUserInfo> | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal({});
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          const userInfo = await web3auth.getUserInfo();
          setUser(userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      const userInfo = await web3auth.getUserInfo();
      setUser(userInfo);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    return user;
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    setUser(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      throw new Error("provider not initialized yet");
    }
    const address = await RPC.getAccounts(provider);
    return address;
  };

  const getBalance = async () => {
    if (!provider) {
      throw new Error("provider not initialized yet");
    }
    const balance = await RPC.getBalance(provider);
    return balance;
  };

  const signMessage = async () => {
    if (!provider) {
      throw new Error("provider not initialized yet");
    }
    const signedMessage = await RPC.signMessage(provider);
    return signedMessage;
  };

  const sendTransaction = async () => {
    if (!provider) {
      throw new Error("provider not initialized yet");
    }
    const transactionReceipt = await RPC.sendTransaction(provider);
    return transactionReceipt;
  };

  return {
    user,
    provider,
    loggedIn,
    login,
    getUserInfo,
    logout,
    getAccounts,
    getBalance,
    signMessage,
    sendTransaction,
  };
};
