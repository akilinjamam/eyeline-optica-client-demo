/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartItem from "@/component/CartItem";
import { Cart, JwtPayload } from "@/app/cart/page";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type TCart<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export default function CartList({ cart }: { cart: TCart<Cart[]> }) {
  const [name, setName] = useState("");
  const router = useRouter();
  const {addToCart} = useCart()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const decode: JwtPayload = jwtDecode(token);
        setName(decode?.name as string);
      }
    }
  }, []);

   const [open, setOpen] = useState(false);
   const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 

  const handleDelete = (id:string) => {
    setSelectedCartId(id);
    console.log(id)
    // your delete logic here
    console.log("Item deleted ✅");
    setOpen(false);
  }

  const confirmDelete = async () => {
    if (!selectedCartId) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/delete-cart-by-id/${selectedCartId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) toast.error(data.message)
      if(res.ok) {
        toast.success(data.message)
        setOpen(false);
        window.dispatchEvent(new Event("cartUpdated"));
      }
      
      setSelectedCartId(null);
      console.log("✅ Cart deleted successfully");
    } catch (err) {
      console.error("❌ Error deleting cart:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleCheckout = (value:string) => {
    const findCart = cart?.data?.find((cart:Cart) => cart?._id === value);
    if(!findCart) return
    localStorage.setItem('cartData', JSON.stringify(findCart)) 
    addToCart(findCart)
    router.push("/cart/checkout");
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
       <ToastContainer/>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">{name || ""}</h2>
        <button onClick={() => router.push("/cart/paymentHistory")} className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer">Payment History</button>
      </div>

      {cart?.data?.length > 0 ? (
        cart.data.slice()?.reverse()?.map((item: Cart) => (
          <CartItem
            key={item?._id}
            id={item?._id}
            image={item?.items[0]?.productId?.images[0] || item?.items[0]?.lensId?.images[0] || item?.items[0]?.contactLensId?.images[0] || item?.items[0]?.accessoryId?.images[0]  as any}
            type={item?.items[0]?.submitType ? item?.items[0]?.submitType : ''}
            name={item?.items[0]?.productId?.name || item?.items[0]?.lensId?.name || item?.items[0]?.contactLensId?.name || item?.items[0]?.accessoryId?.items?.map((value:any) => value.name)?.join('+')}
            color={item?.items[0]?.productId?.color || item?.items[0]?.lensId?.color || item?.items[0]?.contactLensId?.color}
            lensType={item?.items[0]?.contactLensId?.type}
            pd={item?.items[0]?.pd as number}
            price={item.totalAmount}
            lensPrice={item.items[0]?.lensId?.salesPrice}
            framePrice={item.items[0]?.productId?.salesPrice}
            contactLensPrice={item.items[0]?.contactLensId?.salesPrice}
            accessoryPrice={item.items[0]?.accessoryId?.items?.map((value:any) => value.salesPrice)?.reduce((acc:number, sum:number) => acc + sum, 0)}
            deliveryFee={item.deliveryFee}
            rightEye={{
              sphere: item?.items[0]?.rightEye?.sphere as string,
              cylinder: item?.items[0]?.rightEye?.cylinder as string,
              axis: item?.items[0]?.rightEye?.axis as string,
            }}
            leftEye={{
              sphere: item?.items[0]?.leftEye?.sphere as string,
              cylinder: item?.items[0]?.leftEye?.cylinder as string,
              axis: item?.items[0]?.leftEye?.axis as string,
            }}
            quantity={1}
            onRemove={() => {
              handleDelete(item?._id)
              setOpen(true)
            }}
            onCheckout={() =>handleCheckout(item?._id) }
          />
        ))
      ) : (
        <div className="w-full flex justify-center mt-10">
          <div className="bg-gray-50 border border-gray-300 rounded-xl shadow-sm p-6 text-center w-[90%] md:w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              No Cart Available
            </h2>
            <p className="text-sm text-gray-500">
              You don’t have any items in your cart right now.
            </p>
          </div>
          
        </div>
      )}
      <ConfirmDeleteModal
            loading={loading}
            open={open}
            onConfirm={confirmDelete}
            onCancel={() => setOpen(false)}
      />
    </div>
  );
}
