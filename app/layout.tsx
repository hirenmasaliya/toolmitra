
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL("https://toolmitra.vercel.app"),
  title: {
    default: "ToolMitra - Free Online Tools & Calculators",
    template: "%s | ToolMitra",
  },
  description:
    "Explore free online calculators and useful tools for GST, profit, discounts, finance, QR codes, and more.",
  applicationName: "ToolMitra",
  keywords: [
    "free online tools",
    "online calculators",
    "GST calculator",
    "profit calculator",
    "discount calculator",
    "EMI calculator",
    "QR code generator",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {adsenseClient && (
          <meta
            name="google-adsense-account"
            content={adsenseClient}
          />
        )}
      </head>

      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Header />

        <div className="flex-1">{children}</div>

        <Footer />

        {adsenseClient && (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}
