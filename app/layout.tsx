import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import Header from "@/components/ui/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "8Ball Pool Web",
  description: "Play 8 Ball Pool Online",
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
          <Auth0Provider>
            <Header />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Auth0Provider>
      </body>
    </html>
  );
}
