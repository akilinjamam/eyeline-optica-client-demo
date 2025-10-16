import Link from "next/link";

export default function PaymentFailed() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <h1 className="text-2xl font-bold text-red-600">❌ Payment Failed!</h1>
      <p className="mt-2 text-gray-600">
        Something went wrong during your payment. Please try again.
      </p>
      <Link href="/cart/checkout" className="mt-4 text-blue-600 underline">
        <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">Back to Checkout</button>
      </Link>
    </div>
  );
}
