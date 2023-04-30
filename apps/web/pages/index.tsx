import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "ui";
import { Shapes } from "../components/Shapes";
import { useMetamaskContext } from "../contexts/MetamaskContext";

const Main = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  max-width: 546px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.primary};
  margin-bottom: 125px;

  @media (max-width: 1024px) {
    margin-bottom: 62px;
  }
`;

function Landing() {
  const { address, login } = useMetamaskContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (address !== null) router.push("/assets");
  }, [address, router.pathname]);

  return (
    <>
      <Head>
        <title>Assets</title>
      </Head>
      <Main>
        <RightContainer>
          <Title>
            Track Your Crypto Wealth with Our Wallet Balance Service
          </Title>
          <Button onClick={login}>METAMASK</Button>
        </RightContainer>
        <ImageContainer>
          <Shapes />
        </ImageContainer>
      </Main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      theme: "dark",
    },
  };
}

export default Landing;
