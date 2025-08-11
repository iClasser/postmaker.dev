import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Flex } from "next/font/google";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});
const keyworsSeo = [
  "postermaker",
  "interactive",
  "posters",
  "postmaker.dev",
  "poster maker",
  "poster maker app",
  "poster maker web",
  "poster design",
  "poster creator",
  "poster design tool",
  "poster",
  "web",
];

export const metadata: Metadata = {
  title: "Postmaker.dev",
  description: "iClasser PosterMaker",
  keywords: keyworsSeo,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Postermaker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Create stunning posters with Postermaker.dev, the interactive poster maker app. Design your own posters easily with our web-based tool."
        />
        <meta name="keywords" content={keyworsSeo.join(", ")} />
        <meta name="author" content="iClasser" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Postermaker.dev" />
        <meta
          property="og:description"
          content="Create stunning posters with Postermaker.dev, the interactive poster maker app. Design your own posters easily with our web-based tool."
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable}`}>
        {children}
      </body>
    </html>
  );
}
