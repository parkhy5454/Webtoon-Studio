import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "웹툰스튜디오스 (Webtoon Studios)",
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
