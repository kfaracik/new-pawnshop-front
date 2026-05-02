import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import CookieBanner from "components/CookieBanner";
import { CartContextProvider } from "context/CartContext";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";
import muiTheme from "styles/muiTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
