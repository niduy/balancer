import { useState } from "react";
import { connectWallet } from "../connect-wallet";

export const useMetamask = () => {
  const [address, setAddress] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    const storedAddress = localStorage.getItem("address");
    return storedAddress;
  });

  const login = async () => {
    const result = await connectWallet();
    if (result && result.account) {
      setAddress(result.account);
      localStorage.setItem("address", result.account);
    }
  };

  return { address, login };
};
