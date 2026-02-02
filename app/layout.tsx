import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arknights Endfield Gacha Simulator",
  description: "Experience the thrill of summoning in a polished gacha simulator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
