import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { CartContextValue, CartItem } from "types/cart";

const STORAGE_KEY = "cart";

const defaultCartContext: CartContextValue = {
  cartProducts: [],
  setCartProducts: () => undefined,
  addProduct: () => undefined,
  removeProduct: () => undefined,
  removeProductLine: () => undefined,
  setProductQuantity: () => undefined,
  clearCart: () => undefined,
  getCartItemCount: () => 0,
};

export const CartContext = createContext<CartContextValue>(defaultCartContext);

const normalizeId = (id: string | number) => String(id);
const normalizeQuantity = (quantity: unknown) => {
  const parsed = Math.floor(Number(quantity));
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 0;
  }

  return parsed;
};

const clampQuantity = (quantity: unknown, maxQuantity = Infinity) => {
  const normalizedQuantity = normalizeQuantity(quantity);
  const normalizedMax = Number(maxQuantity);

  if (normalizedQuantity <= 0) {
    return 0;
  }

  if (!Number.isFinite(normalizedMax)) {
    return normalizedQuantity;
  }

  return Math.min(normalizedQuantity, Math.max(0, Math.floor(normalizedMax)));
};

const isCartItem = (value: unknown): value is CartItem =>
  Boolean(
    value &&
      typeof value === "object" &&
      "productId" in value &&
      "quantity" in value
  );

const normalizeCartItems = (items: unknown) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const merged = new Map<string, number>();

  for (const item of items) {
    if (!isCartItem(item)) {
      continue;
    }

    const productId = normalizeId(item.productId).trim();
    const quantity = normalizeQuantity(item.quantity);

    if (!productId || quantity <= 0) {
      continue;
    }

    merged.set(productId, Number(merged.get(productId) || 0) + quantity);
  }

  return [...merged.entries()].map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
};

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!storedCart) {
      setIsHydrated(true);
      return;
    }

    try {
      setCartProducts(normalizeCartItems(JSON.parse(storedCart)));
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

    const normalizedCart = normalizeCartItems(cartProducts);
    if (normalizedCart.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedCart));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [cartProducts, isHydrated]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      if (!event.newValue) {
        setCartProducts([]);
        return;
      }

      try {
        setCartProducts(normalizeCartItems(JSON.parse(event.newValue)));
      } catch {
        setCartProducts([]);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addProduct: CartContextValue["addProduct"] = (productId, maxQuantity = Infinity) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      const normalizedMax = Number(maxQuantity);

      if (!normalizedId || (Number.isFinite(normalizedMax) && normalizedMax <= 0)) {
        return prev;
      }

      const productIndex = prev.findIndex(
        (item) => normalizeId(item.productId) === normalizedId
      );

      if (productIndex !== -1) {
        const currentQty = Number(prev[productIndex].quantity || 0);
        const nextQuantity = clampQuantity(currentQty + 1, maxQuantity);
        if (nextQuantity <= currentQty) {
          return prev;
        }

        return prev.map((item, index) =>
          index === productIndex ? { ...item, quantity: nextQuantity } : item
        );
      }

      return [...prev, { productId: normalizedId, quantity: 1 }];
    });
  };

  const removeProduct: CartContextValue["removeProduct"] = (productId) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      const productIndex = prev.findIndex(
        (item) => normalizeId(item.productId) === normalizedId
      );

      if (productIndex === -1) {
        return prev;
      }

      const product = prev[productIndex];
      const currentQty = Number(product.quantity || 0);

      if (currentQty > 1) {
        return prev.map((item, index) =>
          index === productIndex ? { ...item, quantity: currentQty - 1 } : item
        );
      }

      return prev.filter((_, index) => index !== productIndex);
    });
  };

  const removeProductLine: CartContextValue["removeProductLine"] = (productId) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      return prev.filter((item) => normalizeId(item.productId) !== normalizedId);
    });
  };

  const setProductQuantity: CartContextValue["setProductQuantity"] = (
    productId,
    quantity,
    maxQuantity = Infinity
  ) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      const nextQuantity = clampQuantity(quantity, maxQuantity);

      if (!normalizedId) {
        return prev;
      }

      if (nextQuantity <= 0) {
        return prev.filter((item) => normalizeId(item.productId) !== normalizedId);
      }

      const productIndex = prev.findIndex(
        (item) => normalizeId(item.productId) === normalizedId
      );

      if (productIndex === -1) {
        return [...prev, { productId: normalizedId, quantity: nextQuantity }];
      }

      return prev.map((item, index) =>
        index === productIndex ? { ...item, quantity: nextQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value: CartContextValue = {
    cartProducts,
    setCartProducts,
    addProduct,
    removeProduct,
    removeProductLine,
    setProductQuantity,
    clearCart,
    getCartItemCount: () =>
      cartProducts.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
