export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <a href="/" className="text-sm text-blue-600 hover:text-blue-700 mb-8 inline-block">← Back to InvoiceFree</a>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6 text-gray-700 leading-relaxed">
          <p><strong>Last updated:</strong> October 14, 2026</p>
          <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
          <p>InvoiceFree does not collect, store, or transmit any personal information. All invoice data is processed entirely in your browser and is never sent to our servers.</p>
          <h2 className="text-xl font-semibold text-gray-900">2. Cookies and Analytics</h2>
          <p>We use Google Analytics to understand how visitors use our site. Google Analytics collects anonymous usage data such as pages visited and time on site. We also use Google AdSense to display advertisements, which may use cookies to serve relevant ads.</p>
          <h2 className="text-xl font-semibold text-gray-900">3. Third-Party Services</h2>
          <p>We use the following third-party services: Google Analytics for website analytics, and Google AdSense for advertising. These services may collect data according to their own privacy policies.</p>
          <h2 className="text-xl font-semibold text-gray-900">4. Data Security</h2>
          <p>Since all invoice data is processed locally in your browser, your information never leaves your device. We do not have access to any invoice data you create.</p>
          <h2 className="text-xl font-semibold text-gray-900">5. Contact</h2>
          <p>If you have questions about this Privacy Policy, please contact us at invoicefree.app@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
