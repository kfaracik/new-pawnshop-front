import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

// TODO: move from components dir
export const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const normalizeId = (id) => String(id);

  useEffect(() => {
    if (!ls) return;

    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    } else {
      ls?.removeItem("cart");
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const storedCart = JSON.parse(ls.getItem("cart"));
      const filteredCart = storedCart.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          "productId" in item &&
          "quantity" in item
      );
      setCartProducts(filteredCart);
    }
  }, [ls]);

  const addProduct = (productId, maxQuantity = Infinity) => {
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
          index === productIndex
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      } else {
        if (maxQuantity <= 0) {
          return prev;
        }
        return [...prev, { productId: normalizedId, quantity: 1 }];
      }
    });
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const normalizedId = normalizeId(productId);
      const productIndex = prev.findIndex(
        (item) => normalizeId(item.productId) === normalizedId
      );

      if (productIndex !== -1) {
        const product = prev[productIndex];
        const currentQty = Number(product.quantity || 0);

        if (currentQty > 1) {
          return prev.map((item, index) =>
            index === productIndex ? { ...item, quantity: currentQty - 1 } : item
          );
        }

        return prev.filter((_, index) => index !== productIndex);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    ls?.removeItem("cart");
  };

  const getCartItemCount = () => {
    return cartProducts.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
