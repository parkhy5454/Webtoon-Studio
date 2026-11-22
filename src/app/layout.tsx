import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "웹튠스튜디오",
  applicationName: "웹튠스튜디오",
  manifest: "/site.webmanifest",
  appleWebApp: { title: "웹튠스튜디오" },
  icons: {
    icon: { url: "/webtoon-192.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/webtoon-apple.png", type: "image/png", sizes: "180x180" },
  },
  description: "오리지널 웹툰 스트리밍 & 스튜디오 검수 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
