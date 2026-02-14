import type { Metadata } from "next";
import { Playfair_Display, Kanit } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yo & Mean",
  description: "A romantic Valentine photobook celebrating our journey together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${playfairDisplay.variable} ${kanit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
