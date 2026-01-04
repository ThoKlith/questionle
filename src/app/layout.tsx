import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Human Guess",
  description: "Guess the percentage of people who do a certain thing.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// import AdSpace from "@/components/Layout/AdSpace";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:[color-scheme:dark]">
      <body className={outfit.className}>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-1 flex flex-col w-full px-4 pb-24 pt-4">
            <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
              {children}
            </div>
            {/* <AdSpace /> */}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
