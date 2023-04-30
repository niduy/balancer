interface Window {
  ethereum: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (eventName: string, callback: (event: Event) => void) => void;
    removeListener?: (
      eventName: string,
      callback: (event: Event) => void
    ) => void;
  };
}
