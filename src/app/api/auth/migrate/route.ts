import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json({ error: '기존 계정 일괄 이전이 종료되었습니다.' }, { status: 410 });
}
