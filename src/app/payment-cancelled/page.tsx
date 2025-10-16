import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <h1 className="text-2xl font-bold text-yellow-600">⚠️ Payment Cancelled!</h1>
      <p className="mt-2 text-gray-600">
        You cancelled the transaction. No money was deducted.
      </p>
     <Link href="/cart/checkout" className="mt-4 text-blue-600 underline">
        <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">Try Again</button>
      </Link>
    </div>
  );
}
