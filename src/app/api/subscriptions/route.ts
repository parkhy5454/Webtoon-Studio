import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ error: '구독 조회 서비스는 준비 중입니다.' }, { status: 410 });
}

export function POST() {
  return NextResponse.json({ error: '구독 서비스는 준비 중입니다.' }, { status: 410 });
}
