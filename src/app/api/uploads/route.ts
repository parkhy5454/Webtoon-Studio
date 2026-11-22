import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSql, hasDatabaseUrl } from '@/lib/db';
import { ensureAuthSchema, getSessionUser } from '@/lib/auth';

export const runtime = 'nodejs';
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: 'DATABASE_URL이 설정되지 않았습니다.' }, { status: 503 });
  }

  try {
    await ensureAuthSchema();
    const user = await getSessionUser(request);
    if (!user || user.role !== 'creator') {
      return NextResponse.json({ error: '창작자 로그인 후 이미지를 올려주세요.' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files').filter((item): item is File => item instanceof File);
    if (files.length < 1 || files.length > 5) {
      return NextResponse.json({ error: '이미지는 한 번에 1~5장까지 선택해 주세요.' }, { status: 400 });
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: '압축된 이미지 5장 전체 용량은 4MB 이하여야 합니다.' }, { status: 413 });
    }

    const invalidFile = files.find((file) => !ACCEPTED_TYPES.has(file.type));
    if (invalidFile) {
      return NextResponse.json({ error: `${invalidFile.name}: JPG, PNG, WEBP 파일만 업로드할 수 있습니다.` }, { status: 400 });
    }
    const oversizedFile = files.find((file) => file.size <= 0 || file.size > MAX_FILE_BYTES);
    if (oversizedFile) {
      return NextResponse.json({ error: `${oversizedFile.name}: 이미지 한 장은 2MB 이하여야 합니다.` }, { status: 413 });
    }

    const sql = getSql();
    const assets = [];
    const imageBuffers = await Promise.all(files.map(async (file) => Buffer.from(await file.arrayBuffer())));
    const signaturesMatch = imageBuffers.every((buffer, index) => {
      const type = files[index].type;
      if (type === 'image/png') return buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'));
      if (type === 'image/jpeg') return buffer.subarray(0, 3).equals(Buffer.from('ffd8ff', 'hex'));
      return buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
    });
    if (!signaturesMatch) return NextResponse.json({ error: '이미지 파일 형식을 확인해 주세요.' }, { status: 400 });

    for (const [index, file] of files.map((file, index) => [index, file] as const)) {
      const id = randomUUID();
      const base64 = imageBuffers[index].toString('base64');
      await sql`
        INSERT INTO webtoon_assets (id, uploader_user_id, file_name, content_type, data_base64)
        VALUES (${id}, ${user.id}, ${file.name.slice(0, 255)}, ${file.type}, ${base64})
      `;
      assets.push({ id, fileName: file.name, url: `/api/uploads/${id}` });
    }
    return NextResponse.json({ assets }, { status: 201 });
  } catch (error) {
    console.error('POST /api/uploads error:', error);
    return NextResponse.json({ error: '이미지 저장 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
