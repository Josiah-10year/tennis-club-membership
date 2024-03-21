import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SA Tennis Club",
  description: "St Agustine Tennis Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}