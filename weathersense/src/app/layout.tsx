import type { Metadata } from "next";

import { Rokkitt } from "next/font/google";
import "./styles/globals.css";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Weather Sense.",
  description: "Forecasts that make sense",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rokkitt.variable}`}>
      <body className="content-grid">{children}</body>
    </html>
  );
}
