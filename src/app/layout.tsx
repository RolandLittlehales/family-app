import type { Metadata } from "next";
import "./globals.css";
import { themeClass } from "../styles/theme.css";

export const metadata: Metadata = {
  title: "Family App with Vanilla Extract",
  description: "A Next.js app configured with vanilla-extract CSS-in-JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={themeClass}>{children}</body>
    </html>
  );
}
