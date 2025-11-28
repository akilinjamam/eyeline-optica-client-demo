/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CartList from "@/component/CartList";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type JwtPayload = {
  id: string; // assuming your token has user ID as `id`
  customerId?:string;
  email?: string;
  name?:string;
  iat?: number;
  phoneNumber?:string;
  exp?: number;
};
export type JwtPayloadForAppointment = {
  patientId?:string;
  slotId?: string;
  name?:string;
  phone?: number;
  age?:string;
  address?:string;
};

// 👁️ Prescription for each eye
export type Prescription = {
  sphere?: string;   // e.g., "-1.25"
  cylinder?: string; // e.g., "-1.00"
  axis?: string;     // e.g., "140"
  near?:string;
};

// 🛒 Each item in the cart
export type CartItem = {
  type: "frame" | "frame_with_lens" | "lens" | "contact_lens" | "accessory" | "";
  submitType?:string;
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
         router.push("/login");
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

    // 🔥 Listen for the custom event
    const handleCartUpdated = () => getCart()

    window.addEventListener("cartUpdated", handleCartUpdated);

    // cleanup listener
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);

  }, [router]);

  return <div className="w-full bg-white min-h-[100vh] "><CartList cart={cart}/></div>;
}
