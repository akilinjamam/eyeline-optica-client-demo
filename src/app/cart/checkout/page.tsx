
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import sslLogo from "../../../../public/images/ssl-photo.png";
import { toast, ToastContainer } from "react-toastify";

export default function CheckoutPage() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { cart } = useCart();
  const getNewQtyRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getQty = localStorage?.getItem("newQty");
      getNewQtyRef.current = getQty ?? "";
    }
  }, []);

  const [billing, setBilling] = useState({ name: "", phone: "", email: "" });
  const [shipping, setShipping] = useState({ address: "", city: "", zip: "" });

  useEffect(() => {
    setBilling({
      name: cart.customerName,
      phone: cart.phoneNumber,
      email: cart.email ? cart.email : "",
    });
    setShipping({
      address: cart.address ? cart.address : "",
      city: "",
      zip: "",
    });
  }, [cart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const quantity = Number(getNewQtyRef.current) || 1;
    const subtotal = cart.items[0]?.subtotal * quantity;
    const deliveryFee = cart.deliveryFee || 0;

    const hasFrame = !!cart.items[0]?.productId;
    const hasLens = !!cart.items[0]?.lensId;
    const hasContactLens = !!cart.items[0]?.contactLensId;

    const totalCost = subtotal + deliveryFee;

    let payableAmount = 0;
    let dueAmount = 0;

    if (hasFrame && hasLens) {
      payableAmount = totalCost * 0.5;
      dueAmount = totalCost * 0.5;
    } else if (hasFrame || hasLens || hasContactLens) {
      payableAmount = 200;
      dueAmount = totalCost - 200;
    }

    console.log({
      shipping,
      totalCost,
      payableAmount,
      dueAmount,
      cart_id: cart._id
    });

    const sendDataForPayment = {
      quantity: quantity,
      customer_name: billing.name,
      customer_phone: cart.phoneNumber,
      customer_email: billing.email,
      customer_address: shipping.address,
      totalCost,
      payableAmount,
      dueAmount,
      cart_id: cart._id
    }

    console.log(sendDataForPayment)

    try {
      const sendData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}ssl/ssl-init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendDataForPayment),
    });

    const data = await sendData.json();
    console.log(data);
    if(data.success){
      setLoading(false);
      window.location.href = data?.data
    }else{
      toast.error(data.message)
      setLoading(false);
    }

    } catch (error) {
      console.log(error)
    }
  };

  // Precalculate totals for UI
  const quantity = Number(getNewQtyRef.current) || 1;
  const subtotal = cart.items[0]?.subtotal * quantity;
  const deliveryFee = cart.deliveryFee || 0;
  const hasFrame = !!cart.items[0]?.productId;
  const hasLens = !!cart.items[0]?.lensId;
  const hasContactLens = !!cart.items[0]?.contactLensId;
  const totalCost = subtotal + deliveryFee;

  let payableAmount = 0;
  let dueAmount = 0;
  if (hasFrame && hasLens) {
    payableAmount = totalCost * 0.5;
    dueAmount = totalCost * 0.5;
  } else if (hasFrame || hasLens || hasContactLens) {
    payableAmount = 200;
    dueAmount = totalCost - 200;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
       <ToastContainer/>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cart?.items[0]?.productId && (
              <div className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image
                    src={cart.items[0].productId?.images[0]}
                    alt="item"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {cart.items[0].productId?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {cart.items[0].productId?.color}
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    ৳{cart.items[0]?.productId?.salesPrice}
                  </p>
                </div>
              </div>
            )}
            {cart?.items[0]?.lensId && (
              <div className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image
                    src={cart.items[0].lensId?.images[0]}
                    alt="item"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {cart.items[0].lensId?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {cart.items[0].lensId?.brand}
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    ৳{cart.items[0]?.lensId?.salesPrice}
                  </p>
                </div>
              </div>
            )}
            {cart?.items[0]?.contactLensId && (
              <div className="flex items-center gap-4 border border-gray-100 rounded-xl p-3">
                <div className="relative w-20 h-16">
                  <Image
                    src={cart.items[0].contactLensId?.images[0]}
                    alt="item"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {cart.items[0].contactLensId?.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {cart.items[0].contactLensId?.brand}
                  </p>
                  <p className="text-sm font-semibold text-blue-700">
                    ৳{cart.items[0]?.contactLensId?.salesPrice}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="border-t mt-4 pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>৳{deliveryFee}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Cost</span>
              <span>৳{totalCost}</span>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-blue-700 font-semibold">
                <span>Total Payable (via SSLCommerz)</span>
                <span>৳{payableAmount}</span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Due on Delivery</span>
                <span>৳{dueAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Billing + Shipping + Payment */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
            Checkout Details
          </h2>

          {/* Billing Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Billing Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={billing.name}
                type="text"
                placeholder="Full Name"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBilling({ ...billing, name: e.target.value })
                }
              />
              <input
                value={billing.email}
                type="email"
                placeholder="Email"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBilling({ ...billing, email: e.target.value })
                }
              />
              <input
                value={cart.phoneNumber}
                type="text"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                onChange={(e) =>
                  setBilling({ ...billing, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                value={shipping.address}
                type="text"
                placeholder="Street Address"
                className="border border-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Payment Method</h3>
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="text-blue-600" />
                <p className="text-sm font-medium text-gray-700">
                  Pay Securely via SSLCommerz
                </p>
              </div>
              <Image src={sslLogo} alt="SSLCommerz" width={90} height={40} />
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <label className="text-sm">
              <input
                checked={isChecked}
                className="mr-2"
                type="checkbox"
                required
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              I have read and agree to the{" "}
              <a
                href="/terms-and-conditions"
                className="text-blue-600 underline"
              >
                Terms & Conditions
              </a>
              ,
              <a href="/privacy-policy" className="text-blue-600 underline ml-1">
                Privacy Policy
              </a>{" "}
              and
              <a
                href="/return-and-refund-policy"
                className="text-blue-600 underline ml-1"
              >
                Return & Refund Policy
              </a>
              .
            </label>
          </div>

          {/* Submit */}
          {
            !loading
            ?
            <button
            type="submit"
            disabled={!isChecked}
            className={`w-full font-semibold py-3 rounded-lg transition-colors ${
              isChecked
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Place Order & Pay ৳{payableAmount}
          </button>
          :
          <button
            disabled={true}
            className={`w-full font-semibold py-3 rounded-lg transition-colors bg-blue-600 text-white cursor-not-allowed`}
          >
            Initializing...
          </button>
          }
        </form>
      </div>
    </div>
  );
}
