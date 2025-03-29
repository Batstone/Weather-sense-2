import type { Metadata } from "next";

import { Varela_Round, Rokkitt } from "next/font/google";
import "./styles/globals.css";

const rokkitt = Rokkitt({
  variable: "--font-rokkitt",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Weather Sense.",
  description: "Find the forecast",
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
