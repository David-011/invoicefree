'use client';

import { useState, useEffect } from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    invoiceNumber: 'INV-001',
    invoiceDate: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    notes: '',
    taxRate: 0,
  });

    const [showPreview, setShowPreview] = useState(false);
      useEffect(() => {
    if (!invoice.invoiceDate) {
      setInvoice(prev => ({ ...prev, invoiceDate: new Date().toISOString().slice(0, 10) }));
    }
  }, []);


  function addItem() {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, rate: 0 }],
    });
  }

  function removeItem(index: number) {
    if (invoice.items.length === 1) return;
    setInvoice({
      ...invoice,
      items: invoice.items.filter((_, i) => i !== index),
    });
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  }

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax;

  function handlePrint() {
    setShowPreview(true);
    setTimeout(() => window.print(), 500);
  }

  if (showPreview) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 print:p-0">
        <button
          onClick={() => setShowPreview(false)}
          className="print:hidden mb-6 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          ← Back to Editor
        </button>

        <div className="border border-gray-200 rounded-2xl p-8 print:border-0 print:rounded-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
              <p className="text-gray-500 mt-1">#{invoice.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date: {invoice.invoiceDate}</p>
              {invoice.dueDate && (
                <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
              )}
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">From</p>
              <p className="font-semibold text-gray-900">{invoice.fromName}</p>
              <p className="text-sm text-gray-600">{invoice.fromEmail}</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.fromAddress}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Bill To</p>
              <p className="font-semibold text-gray-900">{invoice.toName}</p>
              <p className="text-sm text-gray-600">{invoice.toEmail}</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.toAddress}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-900">
                <th className="text-left py-3 text-sm font-semibold text-gray-900">Description</th>
                <th className="text-center py-3 text-sm font-semibold text-gray-900 w-20">Qty</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 w-28">Rate</th>
                <th className="text-right py-3 text-sm font-semibold text-gray-900 w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-700">{item.description}</td>
                  <td className="py-3 text-sm text-gray-700 text-center">{item.quantity}</td>
                  <td className="py-3 text-sm text-gray-700 text-right">{formatCurrency(item.rate)}</td>
                  <td className="py-3 text-sm text-gray-700 text-right">{formatCurrency(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Tax ({invoice.taxRate}%)</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(tax)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-gray-900 mt-2">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-center print:hidden">
            <p className="text-xs text-gray-400">Generated with InvoiceFree — invoicefree.vercel.app</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Ad Top */}
      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6737852115186889"
          data-ad-slot="2233445566"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      {/* From Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 text-lg">👤</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Details</h2>
            <p className="text-sm text-gray-500">Who is this invoice from?</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name / Business</label>
            <input
              type="text"
              placeholder="John Doe Freelancing"
              value={invoice.fromName}
              onChange={(e) => setInvoice({ ...invoice, fromName: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={invoice.fromEmail}
              onChange={(e) => setInvoice({ ...invoice, fromEmail: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Address</label>
            <textarea
              placeholder="123 Main St, City, State, ZIP"
              value={invoice.fromAddress}
              onChange={(e) => setInvoice({ ...invoice, fromAddress: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* To Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
            <span className="text-violet-600 text-lg">🏢</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Client Details</h2>
            <p className="text-sm text-gray-500">Who are you billing?</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Name / Business</label>
            <input
              type="text"
              placeholder="Acme Corp"
              value={invoice.toName}
              onChange={(e) => setInvoice({ ...invoice, toName: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Email</label>
            <input
              type="email"
              placeholder="billing@acme.com"
              value={invoice.toEmail}
              onChange={(e) => setInvoice({ ...invoice, toEmail: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Client Address</label>
            <textarea
              placeholder="456 Business Ave, City, State, ZIP"
              value={invoice.toAddress}
              onChange={(e) => setInvoice({ ...invoice, toAddress: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <span className="text-emerald-600 text-lg">📄</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Invoice Details</h2>
            <p className="text-sm text-gray-500">Invoice number, dates, and tax</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Invoice #</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Invoice Date</label>
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => setInvoice({ ...invoice, invoiceDate: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tax Rate (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0"
              value={invoice.taxRate || ''}
              onChange={(e) => setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-amber-600 text-lg">📦</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Line Items</h2>
              <p className="text-sm text-gray-500">Add your services or products</p>
            </div>
          </div>
          <button
            onClick={addItem}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            + Add Item
          </button>
        </div>

        <div className="space-y-4">
          {invoice.items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-5">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>}
                <input
                  type="text"
                  placeholder="Web development"
                  value={item.description}
                  onChange={(e) => updateItem(i, 'description', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="col-span-2">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(i, 'quantity', parseInt(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="col-span-3">
                {i === 0 && <label className="block text-xs font-medium text-gray-500 mb-1">Rate ($)</label>}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={item.rate || ''}
                  onChange={(e) => updateItem(i, 'rate', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{formatCurrency(item.quantity * item.rate)}</span>
                {invoice.items.length > 1 && (
                  <button
                    onClick={() => removeItem(i)}
                    className="text-red-400 hover:text-red-600 text-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax ({invoice.taxRate}%)</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(tax)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes / Payment Instructions</label>
        <textarea
          placeholder="Payment due within 30 days. Bank transfer to..."
          value={invoice.notes}
          onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handlePrint}
          className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md shadow-blue-600/20"
        >
          📄 Preview & Print / Save PDF
        </button>
      </div>

      {/* Ad Bottom */}
      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-6737852115186889"
          data-ad-slot="3344556677"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
