"use client";

import { Cart } from "@/app/cart/page";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type CartContextType = {
  cart: Cart;
  addToCart: (item: Cart) => void;
  removeFromCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialObj: Cart = {
    _id: "",
    customerName: "",
    phoneNumber: "",
    email: "",
    address: "",
    items: [],
    totalAmount: 0,
    deliveryFee: 0,
  };

  const [cart, setCart] = useState<Cart>(initialObj);

  // ✅ Load from localStorage only in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("cartData");
      if (storedData) {
        setCart(JSON.parse(storedData));
      }
    }
  }, []);

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartData", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: Cart) => setCart(item);
  const removeFromCart = () => setCart(initialObj);
  const clearCart = () => setCart(initialObj);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
