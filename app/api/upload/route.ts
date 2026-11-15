import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: '파일이 선택되지 않았습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/png';
    const imageUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('업로드 처리 오류:', error);
    return NextResponse.json({ success: false, message: '이미지 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
