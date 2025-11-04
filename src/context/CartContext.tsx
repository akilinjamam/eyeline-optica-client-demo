"use client";

import { Cart } from "@/app/cart/page";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type CartContextType = {
  loading:boolean;
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
  const [loading, setLoading] = useState<boolean>(false);
  

  // ✅ Load from localStorage only in browser
  useEffect(() => {
  
    const defaultObj = {
    _id: "",
    customerName: "",
    phoneNumber: "",
    email: "",
    address: "",
    items: [],
    totalAmount: 0,
    deliveryFee: 0,
  }

  const getCartInfo = async () => {
    if (typeof window === "undefined") return;

    const storedData = localStorage.getItem("cartData");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/get-cart-by-id/${parsedData?.phoneNumber}`
      );
      const json = await result.json();

      if (json.success) {
        const foundCart = json.data?.find(
          (item: Cart) => item._id === parsedData?.id
        );
        setCart(foundCart || defaultObj);
        setLoading(false)
      } else {
        setCart(defaultObj);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart(defaultObj);
    }
  };

  getCartInfo();
}, []);


  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const {_id, phoneNumber} = cart
      localStorage.setItem("cartData", JSON.stringify({id:_id, phoneNumber:phoneNumber}));
    }
  }, [cart]);

  const addToCart = (item: Cart) => setCart(item);
  const removeFromCart = () => setCart(initialObj);
  const clearCart = () => setCart(initialObj);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart }}>
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
