import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppContextProvider from "context/AppContext";
import { Layout } from "components";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
