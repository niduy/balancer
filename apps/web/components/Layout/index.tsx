import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useMetamaskContext } from "../../contexts/MetamaskContext";
import Toast from "../Toast";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Page = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  flex-direction: column;
  padding: 0 88px;
  height: 100vh;

  @media (max-width: 1024px) {
    padding: 0 44px;
  }
`;

type LayoutProps = PropsWithChildren<{}>;

export const Layout = ({ children }: LayoutProps) => {
  const { isBnbTestnet } = useMetamaskContext();

  return (
    <Page>
      <Header />
      {children}
      <Footer />
      <Toast message="Only BNB Testnet is supported" isVisible={isBnbTestnet} />
    </Page>
  );
};
