# 달빛 웹툰 스튜디오 (Dalbit Webtoon Studio)

**Next.js 15 (App Router) + Neon DB (PostgreSQL) + Vercel + PortOne V2** 기반의 구독형 웹툰 멤버십 플랫폼입니다.

---

## 1. GitHub에 코드 올리기

1. 다운로드한 `dalbit-webtoon-studio.zip` 파일의 압축을 풉니다.
2. GitHub에서 새 저장소(Repository)를 생성합니다.
3. 터미널(또는 GitHub Desktop)에서 아래 명령어로 업로드합니다:

```bash
cd dalbit-webtoon-studio
git init
git add .
git commit -m "Initial commit: 달빛 웹툰 스튜디오"
git branch -M main
git remote add origin https://github.com/내아이디/저장소이름.git
git push -u origin main
```

---

## 2. Neon DB (PostgreSQL) 생성

1. [Neon](https://neon.tech/)에 로그인 후 새 프로젝트를 생성합니다.
2. **Connection Details**에서 `DATABASE_URL`을 복사합니다.
   - 예: `postgresql://neondb_owner:xxxx@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
3. 첫 접속 시 `/api/init` 또는 메인 페이지가 자동으로 `webtoons`, `comments`, `subscriptions` 테이블과 초기 작품(《달을 비추는 옥탑》) 데이터를 생성합니다. (수동으로 실행하려면 `db/schema.sql` 참고)

---

## 3. Vercel 배포 및 환경변수 설정

1. [Vercel](https://vercel.com/)에서 **Add New Project** → 방금 올린 GitHub 저장소를 선택합니다.
2. **Environment Variables**에 아래 값을 입력합니다:

| 변수명 | 설명 |
|---|---|
| `DATABASE_URL` | Neon DB 연결 문자열 |
| `NEXT_PUBLIC_PORTONE_STORE_ID` | 포트원 V2 Store ID (테스트 모드 가능) |
| `NEXT_PUBLIC_PORTONE_CHANNEL_KEY` | 포트원 V2 채널 키 (카카오페이/토스 등) |
| `PORTONE_API_SECRET` | 포트원 V2 서버 시크릿 키 (빌링키 검증용) |

3. **Deploy** 버튼을 누르면 배포가 완료됩니다!

---

## 4. PG 심사 전 사업자 정보 입력

사업자등록증 및 통신판매업 신고가 완료되면 `src/app/page.tsx` 하단 `<footer>` 영역의 `[상호명 입력]`, `[대표자명]`, `[000-00-00000]` 부분을 실제 정보로 교체한 뒤 GitHub에 다시 푸시하면 Vercel에 자동 반영됩니다.
