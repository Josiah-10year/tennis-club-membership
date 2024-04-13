import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "St. Augustine Recreational Club",
  description: "St. Augustine Recreational Club",
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