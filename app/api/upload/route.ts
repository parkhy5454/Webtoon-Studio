import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: '파일이 없습니다.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.name.replace(/\s/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public/images');
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const imageUrl = `/images/${filename}`;
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('업로드 실패:', error);
    return NextResponse.json({ success: false, message: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
