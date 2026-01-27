import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TiloLive - Modern Agency Platform",
  description: "Professional agency services and solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
