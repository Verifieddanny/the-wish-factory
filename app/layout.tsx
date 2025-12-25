import type { Metadata } from "next";
import { Geist, Geist_Mono,  Playfair_Display  } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://the-wish-factory.vercel.app'),
  title: "The Wish Factory | Send a Digital Hug",
  description: "Create beautiful, personalized Christmas and New Year greetings for your loved ones.",
  openGraph: {
    title: "The Wish Factory",
    description: "Send a digital hug this holiday season.",
    type: "website",
    images: "https://the-wish-factory.vercel.app/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
