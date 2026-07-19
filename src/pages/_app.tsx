import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import CookieBanner from "components/CookieBanner";
import { CartContextProvider } from "context/CartContext";
import { WishlistContextProvider } from "context/WishlistContext";
import queryClient from "lib/queryClient";
import GlobalStyles from "styles/GlobalStyles";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const scrollToTop = () => window.scrollTo(0, 0);
    router.events.on("routeChangeComplete", scrollToTop);
    return () => router.events.off("routeChangeComplete", scrollToTop);
  }, [router.events]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--app-font:${poppins.style.fontFamily};}`,
          }}
        />
      </Head>
      <GlobalStyles />
      <div className={poppins.className} style={{ display: "contents" }}>
        <CartContextProvider>
          <WishlistContextProvider>
            <AnimatePresence mode="wait">
              <Component {...pageProps} />
            </AnimatePresence>
            <CookieBanner />
          </WishlistContextProvider>
        </CartContextProvider>
      </div>
    </QueryClientProvider>
  );
}
