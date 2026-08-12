import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dulce Sabor - Pastelería Artesanal",
  description: "Descubre los mejores postres y cafés artesanales en un solo lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#e8ddf6]`}
      >
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-[#662383] text-[#e8ddf6] text-center py-4 mt-12">
          <p className="text-sm">© 2026 Dulce Sabor - Hecho con ❤️ para los amantes de los postres</p>
        </footer>
      </body>
    </html>
  );
}