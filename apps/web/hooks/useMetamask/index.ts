import { useEffect, useState } from "react";
import Web3 from "web3";
import { connectWallet } from "./connectWallet";
import { isEthereumAvailable } from "./isEithereumAvailable";

const BNB_TESTNET_NETWORK_ID = 97;

export const useMetamask = () => {
  const [address, setAddress] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    const storedAddress = localStorage.getItem("address");
    return storedAddress;
  });
  const [isBnbTestnet, setBnbTestnet] = useState(false);

  const login = async () => {
    const result = await connectWallet();
    if (result && result.account) {
      setAddress(result.account);
      localStorage.setItem("address", result.account);
    }
  };

  useEffect(() => {
    if (!isEthereumAvailable(window)) return;
    const web3 = new Web3(window.ethereum as any);

    const checkNetwork = async () => {
      const networkId = await web3.eth.net.getId();
      setBnbTestnet(networkId !== BNB_TESTNET_NETWORK_ID);
    };

    const intervalId = setInterval(checkNetwork, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { address, login, isBnbTestnet };
};
