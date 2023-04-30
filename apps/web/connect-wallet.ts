const Web3 = require("web3");

const isEthereum = (window: Window): window is Window & typeof window => {
  return "ethereum" in window;
};

export const connectWallet = async () => {
  if (!isEthereum(window)) {
    console.warn(
      "MetaMask not found. Please install it from https://metamask.io/"
    );
    return null;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // TODO: update window.ethereum type
    const web3 = new Web3(window.ethereum as any);
    const accounts = await web3.eth.getAccounts();
    return { account: accounts[0] };
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    return null;
  }
};
