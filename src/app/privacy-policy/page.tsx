export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Eyeline Optica</strong>, your privacy is our top priority. This policy explains how we collect, use, 
        and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Personal details such as name, phone number, and email.</li>
        <li>Shipping address and order details.</li>
        <li>Optional prescription uploads for lenses.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To process orders and deliveries.</li>
        <li>To provide customer support and communication.</li>
        <li>To improve our website and user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We use <strong>SSLCommerz</strong> for secure transactions. Your payment data is encrypted and never stored on our servers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance user experience, track performance, and offer personalized content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Disclosure</h2>
      <p className="mb-4">
        We do not sell or share your information with third parties, except for delivery or payment processing partners.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your data by contacting us at 
        <a href="mailto:support@eyelineoptica.com" className="text-blue-600 underline"> support@eyelineoptica.com</a>.
      </p>

      <p className="mt-10 text-sm text-gray-500">Last updated: 10/15/2025</p>
    </div>
  );
}
