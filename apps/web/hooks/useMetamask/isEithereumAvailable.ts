export const isEthereumAvailable = (
  window: Window
): window is Window & typeof window => {
  return "ethereum" in window;
};
