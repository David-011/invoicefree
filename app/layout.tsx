import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceFree — Free Invoice Generator for Freelancers",
  description: "Create professional invoices in seconds. Free invoice generator for freelancers and small businesses. No signup required. Download as PDF.",
  keywords: "invoice generator, free invoice, freelancer invoice, invoice template, create invoice, PDF invoice",
  openGraph: {
    title: "InvoiceFree — Free Invoice Generator",
    description: "Create professional invoices in seconds. 100% free, no signup required.",
    url: "https://invoicefree.vercel.app",
    siteName: "InvoiceFree",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6737852115186889" />
        <meta name="google-site-verification" content="2e_0PmoiWrjAlKG85OPVw93SLbjY0oKWo2W4Ai2VCgc" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6737852115186889"
          crossOrigin="anonymous"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KEW4QFMVCN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KEW4QFMVCN');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
