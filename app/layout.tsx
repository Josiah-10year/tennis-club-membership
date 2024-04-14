import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St. Augustine Recreational Club",
  description: "St. Augustine Recreational Club",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>St. Augustine Recreational Club</title>
        <meta
          name="description"
          content="The official website of the St. Augustine Recreational Club"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://github.com/Josiah-10year/tennis-club-membership/blob/fd7e9089b3668756f74fae9225e85685438fe1ba/app/favicon.ico" />
      </head>
        <body className="parallax-background">
          <Header />
          <main className="bg-transparent min-h-[600px]">{children}</main>
          <Footer />
        </body>

    </html>
  );
}
