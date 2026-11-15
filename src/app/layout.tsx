import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '웹툰스튜디오스 - 오픈 웹툰 창작 & 구독 플랫폼',
  description: '작가와 독자가 함께 만드는 웹툰 스튜디오',
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
