import type { Metadata } from "next";
import "./globals.css";
import { themeClass } from "../styles/theme.css";
import { SessionProvider } from "../components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Family App",
  description: "A comprehensive family organization app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={themeClass}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
