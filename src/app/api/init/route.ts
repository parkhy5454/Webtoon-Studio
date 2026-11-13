import { NextResponse } from "next/server";
import { ensureSchemaAndSeed, hasDatabaseUrl } from "@/lib/db";

export async function GET() {
  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({
        connected: false,
        message: "DATABASE_URL이 설정되지 않아 로컬 프리뷰 모드로 동작 중입니다.",
      });
    }
    await ensureSchemaAndSeed();
    return NextResponse.json({
      connected: true,
      message: "Neon DB 테이블 초기화 및 시드 데이터 확인 완료",
    });
  } catch (error) {
    console.error("DB init error:", error);
    return NextResponse.json(
      { connected: false, error: "DB 초기화 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
