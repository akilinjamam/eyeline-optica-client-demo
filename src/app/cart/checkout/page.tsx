"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import sslLogo from "../../../../public/images/ssl-photo.png";

export default function CheckoutPage() {
    
    const {cart} = useCart();
     const getNewQtyRef = useRef<string>('');
    useEffect(() => {
        if(typeof window !== "undefined"){
            const getQty = localStorage?.getItem("newQty"); 
            getNewQtyRef.current = getQty ?? '';
        }
    }, []);
    const [billing, setBilling] = useState({ name: "", phone: "", email: "" });
    const [shipping, setShipping] = useState({ address: "", city: "", zip: "" });

  useEffect(() => {
    setBilling({
        name: cart.customerName,
        phone: cart.phoneNumber,
        email: cart.email ? cart.email : ""
    })
    setShipping({
        address: cart.address ? cart.address : '',
        city: "",
        zip: ""
    })
  },[cart])

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ billing, shipping });
    // 🔹 Here you’ll integrate SSLCommerz payment redirection
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            {
                cart?.items[0]?.productId
                &&
                <div  className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image src={cart.items[0].productId?.images[0]} alt="item" fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{cart.items[0].productId?.name}</h4>
                  <p className="text-xs text-gray-500">{cart.items[0].productId?.color}</p>
                  <p className="text-sm font-semibold text-blue-700">৳{cart.items[0]?.productId?.salesPrice}</p>
                </div>
            </div>
            }
            {
                cart?.items[0]?.lensId
                &&
                <div  className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image src={ cart.items[0].lensId?.images[0]} alt="item" fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{cart.items[0].lensId?.name}</h4>
                  <p className="text-xs text-gray-500">{cart.items[0].lensId?.color}</p>
                  <p className="text-xs text-gray-500">{cart.items[0].lensId?.brand}</p>
                  <p className="text-sm font-semibold text-blue-700">৳{cart.items[0]?.lensId?.salesPrice}</p>
                </div>
            </div>
            }
            {
                cart?.items[0]?.contactLensId
                &&
                <div  className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image src={ cart.items[0].contactLensId?.images[0]} alt="item" fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{cart.items[0].contactLensId?.name}</h4>
                  <p className="text-xs text-gray-500">{cart.items[0].contactLensId?.color}</p>
                  <p className="text-xs text-gray-500">{cart.items[0].contactLensId?.brand}</p>
                  <p className="text-sm font-semibold text-blue-700">৳{cart.items[0]?.lensId?.salesPrice}</p>
                </div>
            </div>
            }
          </div>

          <div className="border-t mt-4 pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{cart.items[0]?.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{getNewQtyRef.current}</span>
            </div>
            <hr />
            <div className="flex justify-end">
              <span>৳{cart.items[0]?.subtotal * Number(getNewQtyRef.current)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>৳{cart.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-gray-800 border-t pt-2">
              <span>Total</span>
              <span>৳{(cart?.items[0]?.subtotal * Number(getNewQtyRef.current)) + cart?.deliveryFee}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Billing + Shipping + Payment */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Checkout Details</h2>

          {/* Billing Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Billing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={billing.name}
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setBilling({ ...billing, name: e.target.value })}
              />
              <input
               value={billing.email}
                type="email"
                placeholder="Email"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setBilling({ ...billing, email: e.target.value })}
              />
              <input
                value={cart.phoneNumber}
                type="text"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={shipping.address}
                type="text"
                placeholder="Street Address"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Payment Method</h3>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-600" />
                <p className="text-sm font-medium text-gray-700">Pay Securely via SSLCommerz</p>
              </div>
              <Image src={sslLogo} alt="SSLCommerz" width={90} height={40} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Place Order & Pay
          </button>
        </form>
      </div>
    </div>
  );
}
