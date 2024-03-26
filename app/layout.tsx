import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SA Recreational Club",
  description: "St Agustine Recreational Club",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Court Booking</title>
        <meta
          name="description"
          content="Generated by create next app with Wix Bookings integration"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.wix.com/favicon.ico" />
      </head>
        <body className="parallax-background">
          <Header />
          <main className="bg-transparent min-h-[600px]">{children}</main>
          <Footer />
        </body>

    </html>
  );
}
