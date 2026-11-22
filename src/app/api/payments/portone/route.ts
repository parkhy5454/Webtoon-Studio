import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json({ error: '결제 서비스는 준비 중입니다.' }, { status: 410 });
}
