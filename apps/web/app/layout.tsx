import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
    "web"
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
