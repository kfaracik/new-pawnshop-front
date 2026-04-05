import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "context/CartContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";
import { AnimatePresence } from "framer-motion";
import muiTheme from "styles/muiTheme";
import CookieBanner from "components/CookieBanner";

export default function App({ Component, pageProps }) {
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
