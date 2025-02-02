import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "context/CartContext";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <CartContextProvider>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </CartContextProvider>
    </QueryClientProvider>
  );
}
