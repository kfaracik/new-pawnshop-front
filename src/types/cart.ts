export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartContextValue = {
  cartProducts: CartItem[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addProduct: (productId: string | number, maxQuantity?: number) => void;
  removeProduct: (productId: string | number) => void;
  removeProductLine: (productId: string | number) => void;
  setProductQuantity: (
    productId: string | number,
    quantity: number,
    maxQuantity?: number
  ) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
};
