import "../global.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Layout } from "../components/Layout";
import { darkTheme, lightTheme } from "../themes";
import { MetamaskProvider } from "../contexts/MetamaskContext";

type Props = AppProps & {
  pageProps: {
    theme: "light" | "dark";
  };
};

// TODO: Add accessibility testing with axe
function MyApp({ Component, pageProps }: Props) {
  const selectedTheme = pageProps.theme === "light" ? lightTheme : darkTheme;

  return (
    <MetamaskProvider>
      <ThemeProvider theme={selectedTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </MetamaskProvider>
  );
}

export default MyApp;
