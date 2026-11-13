import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "달빛 웹툰 스튜디오 - 멀티 웹툰 멤버십 & 모바일 뷰어",
  description:
    "《달을 비추는 옥탑》 오리지널 웹툰 멤버십 구독 플랫폼. PortOne V2 정기결제 + Neon PostgreSQL + Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        {children}
        <Script
          src="https://cdn.portone.io/v2/browser-sdk.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
