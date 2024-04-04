import Layout from "@/components/Common/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Layout>
        <Head>
          <title>Sungho Park - Frontend Engineer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content={"Hello! I am Sungho Park, Frontend Engineer!"}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
