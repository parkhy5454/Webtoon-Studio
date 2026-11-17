import './globals.css';
import type { Metadata } from 'react';

export const metadata: Metadata = {
  title: '웹툰스튜디오스 - 웹툰 창작 및 구독 플랫폼',
  description: '오픈 웹툰 창작, 업로드 및 1~100화 구독 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-950 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}