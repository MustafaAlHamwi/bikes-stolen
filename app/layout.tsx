import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

export const metadata: Metadata = {
  title: "BikesIndex",
  description: "Bikes stolen in Munich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  min-h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
