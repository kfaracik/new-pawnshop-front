import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import CookieBanner from "components/CookieBanner";
import { CartContextProvider } from "context/CartContext";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";
import muiTheme from "styles/muiTheme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Reset scroll to the top on every navigation — including shallow query
  // changes (pagination, category filters) and footer/header links, which
  // Next.js does not always scroll for on its own.
  useEffect(() => {
    const scrollToTop = () => window.scrollTo(0, 0);
    router.events.on("routeChangeComplete", scrollToTop);
    return () => router.events.off("routeChangeComplete", scrollToTop);
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalStyles />
        <CartContextProvider>
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
          <CookieBanner />
        </CartContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
