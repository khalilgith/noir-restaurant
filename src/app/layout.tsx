import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOIR | Michelin-Star Dining, Paris",
  description: "An immersive culinary journey through the finest ingredients, masterful technique, and timeless elegance in the heart of Paris. Reserve your table at NOIR.",
  keywords: "fine dining, paris restaurant, michelin star, french cuisine, luxury dining, NOIR",
  openGraph: {
    title: "NOIR | Michelin-Star Dining, Paris",
    description: "An immersive culinary journey through the finest ingredients, masterful technique, and timeless elegance.",
    type: "website",
    locale: "en_US",
    siteName: "NOIR",
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
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
