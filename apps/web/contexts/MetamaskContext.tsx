import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useMetamask } from "../hooks/useMetamask";

export const MetamaskContext = createContext<ReturnType<
  typeof useMetamask
> | null>(null);

export const useMetamaskContext = () => useContext(MetamaskContext);

export const MetamaskProvider = ({ children }: PropsWithChildren<{}>) => {
  const { address, login } = useMetamask();

  return (
    <MetamaskContext.Provider value={{ address, login }}>
      {children}
    </MetamaskContext.Provider>
  );
};
