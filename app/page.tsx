import InvoiceGenerator from './InvoiceGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IF</span>
            </div>
            <span className="text-lg font-bold text-gray-900">InvoiceFree</span>
          </a>
          <a
            href="https://taxreserve-lake.vercel.app"
            target="_blank"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Try TaxReserve →
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 py-10">
        <div className="max-w-3xl mx-auto px-4 text-center mb-10">
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
            ✦ 100% Free — No signup required
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Create professional
            <span className="text-blue-600"> invoices</span> in seconds
          </h1>
          <p className="mt-3 text-gray-500 text-lg">
            Free invoice generator for freelancers and small businesses.
            <br className="hidden sm:block" />
            Fill in your details, preview, and download as PDF.
          </p>
        </div>

        <InvoiceGenerator />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <div className="flex justify-center gap-4 mb-3">
            <a href="https://taxreserve-lake.vercel.app" target="_blank" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              TaxReserve
            </a>
            <span className="text-gray-300">·</span>
            <a href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">·</span>
            <a href="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-sm text-gray-500">
            InvoiceFree is a free tool for creating invoices.
            <br />
            Not a substitute for professional accounting software.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 InvoiceFree. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
