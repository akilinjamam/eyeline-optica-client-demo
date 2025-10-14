export default function ReturnAndRefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Return & Refund Policy</h1>

      <p className="mb-4">
        Thank you for shopping at <strong>Eyeline Optica</strong>. We value your satisfaction and strive to ensure a smooth shopping experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Return Eligibility</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Product must be returned within <strong>7–10 working days</strong> of delivery.</li>
        <li>Items must be unused, undamaged, and in original packaging.</li>
        <li>Proof of purchase must be provided.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Non-Returnable Items</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Opened contact lenses</li>
        <li>Custom prescription lenses</li>
        <li>Sale or clearance items</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Refund Timeline</h2>
      <p className="mb-4">
        Once we receive and inspect the product, refunds will be issued within <strong>7–10 working days</strong> 
        to the original payment method.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact Information</h2>
      <p className="mb-2">For any refund or return inquiries, please contact:</p>
      <p>Email: <a href="mailto:support@eyelineoptica.com" className="text-blue-600 underline">support@eyelineoptica.com</a></p>
      <p>Phone: --------------</p>
      <p>Address: -----------------</p>

      <p className="mt-10 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
