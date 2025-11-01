export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Eyeline Optica</strong>. By accessing our website or purchasing our products, 
        you agree to the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. General</h2>
      <p className="mb-4">
        Eyeline Optica reserves the right to update or modify these terms at any time without prior notice.
        Continued use of the website indicates acceptance of any revised terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Product Information</h2>
      <p className="mb-4">
        We aim to provide accurate details, pricing, and stock status for all our products. 
        However, mistakes may occur, and Eyeline Optica reserves the right to correct any inaccuracies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders & Payments</h2>
      <p className="mb-4">
        All payments are securely processed via <strong>SSLCommerz</strong>. Orders are confirmed 
        only after successful payment verification. Eyeline Optica may cancel any invalid or fraudulent orders.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Delivery</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Inside Dhaka: Estimated <strong>5 days</strong></li>
        <li>Outside Dhaka: Estimated <strong>10 days</strong></li>
      </ul>
      <p className="mb-4">Delays may occur due to logistics, national holidays, or natural causes.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Returns & Refunds</h2>
      <p className="mb-4">
        Returns are subject to our <a href="/return-and-refund-policy" className="text-blue-600 underline">Return & Refund Policy</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">
        Eyeline Optica will not be liable for indirect or consequential damages resulting from product use or delivery delays.
      </p>

      <p className="mt-10 text-sm text-gray-500">Last updated: 10/15/2025</p>
    </div>
  );
}
