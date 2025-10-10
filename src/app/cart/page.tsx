/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartList from "@/component/CartList";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type JwtPayload = {
  id: string; // assuming your token has user ID as `id`
  email?: string;
  name?:string;
  iat?: number;
  phoneNumber?:string;
  exp?: number;
};

// 👁️ Prescription for each eye
export type Prescription = {
  sphere?: string;   // e.g., "-1.25"
  cylinder?: string; // e.g., "-1.00"
  axis?: string;     // e.g., "140"
};

// 🛒 Each item in the cart
export type CartItem = {
  type: "frame" | "frame_with_lens" | "lens" | "contact_lens" | "accessory";
  productId?: any;
  lensId?: any;
  contactLensId?: any;
  accessoryId?: any;
  prescriptionImg?: string[]; // optional array of image URLs
  pd?: number;
  rightEye?: Prescription;
  leftEye?: Prescription;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

// 🧾 Main cart type
export type Cart = {
  _id:string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
};
export default function Page() {
  const [cart, setCart] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const getCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
         router.push("/");
         return
      }

      // Decode JWT token
      const decoded: JwtPayload = jwtDecode(token as string);
      const userId = decoded.phoneNumber;

      // Fetch the cart
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/get-cart-by-id/${userId}`,);

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCart();
  }, [router]);

  return <CartList cart={cart}/>;
}
