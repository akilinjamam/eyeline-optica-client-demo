import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center">
      <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-2 text-gray-600">
        Thank you for your payment. Your order has been confirmed.
      </p>
      <Link href="/" className="mt-4 text-blue-600 underline">
        <button className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md">Return to Home</button>
      </Link>
    </div>
  );
}
