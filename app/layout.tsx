import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
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
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Header />

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}