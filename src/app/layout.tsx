import type { Metadata } from "next";
import "./globals.css";
import { themeClass } from "../styles/theme.css";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  title: "Family App",
  description: "A family coordination app for books, streaming, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={themeClass}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
