import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartContextProvider } from "components/CartContext";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </QueryClientProvider>
  );
}
