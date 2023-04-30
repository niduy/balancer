import styled from "styled-components";
import TokenTable from "./_TokenTable";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMetamaskContext } from "../../contexts/MetamaskContext";

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: left;
  width: 100%;
  margin-bottom: 97px;
`;

function Assets() {
  const { address } = useMetamaskContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (address === null) router.push("/");
  }, [address, router.pathname]);

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Assets</title>
      </Head>
      <Main>
        <Title>Assets</Title>
        <TokenTable />
      </Main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      theme: "light",
    },
  };
}

export default Assets;
