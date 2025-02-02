import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

// TODO: move from components dir
export const CartContextProvider = ({ children }) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
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

  const addProduct = (productId) => {
    setCartProducts((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex !== -1) {
        const updatedCart = [...prev];
        const product = updatedCart[productIndex];

        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          updatedCart.splice(productIndex, 1);
        }
        return updatedCart;
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
