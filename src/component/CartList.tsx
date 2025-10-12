/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartItem from "@/component/CartItem";
import { Cart, JwtPayload } from "@/app/cart/page";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type TCart<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export default function CartList({ cart }: { cart: TCart<Cart[]> }) {
  const [name, setName] = useState("");

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

  const handleDelete = (id:string) => {
    console.log(id)
    // your delete logic here
    console.log("Item deleted ✅");
    setOpen(false);
  }

  const confirmDelete = () => {
    console.log('hello')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{name || ""}</h2>

      {cart?.data?.length > 0 ? (
        cart.data.map((item: Cart) => (
          <CartItem
            key={item?._id}
            id={item?._id}
            image={item?.items[0]?.productId?.images[0] || item?.items[0]?.lensId?.images[0] as any}
            type={item?.items[0]?.submitType ? item?.items[0]?.submitType : ''}
            name={item?.items[0]?.productId?.name || item?.items[0]?.lensId?.name}
            color={item?.items[0]?.productId?.color || item?.items[0]?.lensId?.color}
            lensType={item?.items[0]?.lensId?.lensType}
            pd={item?.items[0]?.pd as number}
            price={item.totalAmount}
            lensPrice={item.items[0]?.lensId?.salesPrice}
            framePrice={item.items[0]?.productId?.salesPrice}
            deliveryFee={item.deliveryFee}
            rightEye={{
              sphere: item?.items[0]?.rightEye?.sphere as string,
              cylinder: item?.items[0]?.rightEye?.cylinder as string,
              axis: item?.items[0]?.rightEye?.axis as string,
            }}
            leftEye={{
              sphere: item?.items[0]?.leftEye?.sphere as string,
              cylinder: item?.items[0]?.rightEye?.cylinder as string,
              axis: item?.items[0]?.rightEye?.axis as string,
            }}
            quantity={1}
            onEdit={() => alert("Edit clicked")}
            onRemove={() => {
              handleDelete(item?._id)
              setOpen(true)
            }}
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
            open={open}
            onConfirm={confirmDelete}
            onCancel={() => setOpen(false)}
      />
    </div>
  );
}
