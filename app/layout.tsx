import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import ReactQueryClientProvider from "@/context/ReactQueryClientProvider";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Oneredbox Construction Co.",
  description:
    "Premium construction services for residential, commercial, and industrial projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-H5LXG70F8W`}
          strategy="afterInteractive"
        /> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3QRL8SL0EF"
          strategy="afterInteractive"
        />

        <Script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3QRL8SL0EF', {
            page_path: window.location.pathname,
          });
        `}
        </Script>
        <link rel="icon" href="/images/oneLogo.png" sizes="any" />
      </head>
      <body className={`${barlow.variable} ${barlow.className} antialiased`}>
        <ReactQueryClientProvider>
          <Header />
          {children}
        </ReactQueryClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId="G-3QRL8SL0EF" />
      <GoogleAnalytics gaId="G-3QRL8SL0EF" />
    </html>
  );
}
