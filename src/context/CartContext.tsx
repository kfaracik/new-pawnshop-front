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
  clearCart: () => undefined,
  getCartItemCount: () => 0,
};

export const CartContext = createContext<CartContextValue>(defaultCartContext);

const normalizeId = (id: string | number) => String(id);

const isCartItem = (value: unknown): value is CartItem =>
  Boolean(
    value &&
      typeof value === "object" &&
      "productId" in value &&
      "quantity" in value
  );

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (cartProducts.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartProducts));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!storedCart) {
      return;
    }

    try {
      const parsedCart = JSON.parse(storedCart) as unknown[];
      setCartProducts(
        parsedCart
          .filter(isCartItem)
          .map((item) => ({
            productId: normalizeId(item.productId),
            quantity: Number(item.quantity) || 0,
          }))
          .filter((item) => item.quantity > 0)
      );
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const addProduct: CartContextValue["addProduct"] = (productId, maxQuantity = Infinity) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      const productIndex = prev.findIndex(
        (item) => normalizeId(item.productId) === normalizedId
      );

      if (productIndex !== -1) {
        const currentQty = Number(prev[productIndex].quantity || 0);
        if (currentQty >= maxQuantity) {
          return prev;
        }

        return prev.map((item, index) =>
          index === productIndex ? { ...item, quantity: currentQty + 1 } : item
        );
      }

      if (maxQuantity <= 0) {
        return prev;
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
    clearCart,
    getCartItemCount: () =>
      cartProducts.reduce((acc, item) => acc + Number(item.quantity || 0), 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
