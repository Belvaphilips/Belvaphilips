import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";
import Head from "next/head";

import Header from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
});
const gilroy = localFont({
  src: [
    {
      path: "./fonts/Gilroy/Gilroy-ExtraBold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Gilroy/Gilroy-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: "BelvaPhilips Imagery - Studio Quality Photography",
  description: "Studio quality photography made simple",

  openGraph: {
    title: "BelvaPhilips Imagery - Studio Quality Photography",
    description: "Studio quality photography made simple",
    url: "https://belvaphilips.vercel.app",
    siteName: "BelvaPhilips Imagery",
    images: [
      {
        url: "https://res.cloudinary.com/kingkunmi/image/upload/v1747587178/belvaphilips_tl8myz.svg",
        width: 1200,
        height: 630,
        alt: "BelvaPhilips Imagery Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayoutServer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased ${gilroy.variable}`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        <Head>
          <meta
            name="google-site-verification"
            content="uynsFH9sN28k9U4E1kmQ--cCkUvIH_PN_ouHwBTl3Ew"
          />
        </Head>

        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
