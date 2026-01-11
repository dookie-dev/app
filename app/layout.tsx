import "./globals.css";
import Providers from "./providers";
import { Merienda, ABeeZee } from "next/font/google";
import { getSiteSettings } from "@/lib/fetch";
import type { Metadata } from "next";

const merienda = Merienda({
  subsets: ["latin"],
  variable: "--font-merienda",
  display: "swap",
});

const abeezee = ABeeZee({
  weight: ["400", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-abeezee",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title:
      settings?.seo_title || "Dookiee.s | Handcrafted Soft Cookies & Brownies",
    description:
      settings?.seo_description ||
      "Experience the magic of homemade soft cookies.",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${merienda.variable} ${abeezee.variable}`}>
      <body className="font-sans antialiased text-bellaria-dark bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
