import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.whiterock.com.ph"),
  title: "Whiterock Beach Resort | Philippine Tourism Awards 2024 Resort of the Year",
  description:
    "Discover Whiterock Beach Resort, a premier beachfront getaway in Subic, Zambales. Spanning 7 hectares with a 300-meter shoreline, waterpark attractions, luxury rooms & villas, and family retreats.",
  keywords: [
    "Whiterock Beach Resort",
    "Subic Zambales beach resort",
    "Waterpark resort Philippines",
    "Resort of the Year 2024",
    "Beach hotel Subic",
    "Company outings Subic",
    "Beach wedding Subic",
  ],
  authors: [{ name: "Whiterock Beach Resort" }],
  openGraph: {
    title: "Whiterock Beach Resort | Experience Paradise in Subic",
    description:
      "Your ultimate beach getaway awaits at Whiterock Beach Resort with 7 hectares of shoreline, waterparks, and deluxe accommodations.",
    url: "https://www.whiterock.com.ph",
    siteName: "Whiterock Beach Resort",
    images: [
      {
        url: "/assets/images/homepage/Beach_Top_View_2552.png",
        width: 1200,
        height: 630,
        alt: "Whiterock Beach Resort Aerial View",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b3b60",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-amber-500 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
