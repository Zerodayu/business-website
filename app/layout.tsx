import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Sections/Footer";
import Hero from "@/Components/Sections/Header";
import SmoothScroll from "@/Components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koys Photography",
  description: "I'm a freelance photographer specializing in capturing authentic moments, creative portraits, and stunning visuals for events, brands, and personal projects.",
  icons: {
    icon: [
      { url: "/koysLOGO.svg", type: "image/svg+xml" },
    ],
  },
  keywords: [
    "freelance photographer",
    "portrait photography",
    "event photography",
    "Koys Photography",
    "Koys Photos",
    "creative photoshoots",
    "professional photography",
    "visual storytelling",
    "branding photography",
    "lifestyle photography"
  ],
  openGraph: {
    images: [
      {
        url: "metadataCover.png", // Replace with your image filename in /public
        width: 1200,
        height: 630,
        alt: "Koys Photography Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["metadataCover.png"], // Replace with your image filename in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col hide-scrollbar`}
      >
        <SmoothScroll />
        <main className="flex-1">
          {children}
          <Hero />
        </main>
        <Footer />
      </body>
    </html>
  );
}
