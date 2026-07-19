import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

const STORAGE_KEY = "wishlist";

type WishlistContextValue = {
  wishlist: string[];
  isWishlisted: (productId: string | number) => boolean;
  toggleWishlist: (productId: string | number) => void;
  removeFromWishlist: (productId: string | number) => void;
  clearWishlist: () => void;
  wishlistCount: number;
};

const defaultValue: WishlistContextValue = {
  wishlist: [],
  isWishlisted: () => false,
  toggleWishlist: () => undefined,
  removeFromWishlist: () => undefined,
  clearWishlist: () => undefined,
  wishlistCount: 0,
};

export const WishlistContext = createContext<WishlistContextValue>(defaultValue);

const normalizeIds = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<string>();
  for (const item of value) {
    const id = String(item).trim();
    if (id) {
      seen.add(id);
    }
  }
  return [...seen];
};

export const WishlistContextProvider = ({ children }: PropsWithChildren) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setIsHydrated(true);
      return;
    }

    try {
      setWishlist(normalizeIds(JSON.parse(stored)));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) {
      return;
    }

    if (wishlist.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [wishlist, isHydrated]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      setWishlist(event.newValue ? normalizeIds(JSON.parse(event.newValue)) : []);
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isWishlisted: WishlistContextValue["isWishlisted"] = (productId) =>
    wishlist.includes(String(productId));

  const toggleWishlist: WishlistContextValue["toggleWishlist"] = (productId) => {
    const id = String(productId).trim();
    if (!id) {
      return;
    }
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  };

  const removeFromWishlist: WishlistContextValue["removeFromWishlist"] = (productId) => {
    const id = String(productId).trim();
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const clearWishlist = () => setWishlist([]);

  const value: WishlistContextValue = {
    wishlist,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};
