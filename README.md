# 툰스튜디오스 (Toon Studios)

Next.js App Router 기반 웹툰 스트리밍 및 관리자 검수 프로젝트입니다.

## 주요 구현 기능
1. **모바일/화면 하단 고정 탭바 (`fixed bottom-0`) 복원**
   - 작품 소개 · 웹툰 뷰어 · 멤버십 · 커뮤니티 · 설정 5개 탭 제공 (아이폰 safe-area 대응)
2. **회차별 권한 및 멤버십 자동 해제**
   - 1~5화 무료 / 6~100화 멤버십 잠금 및 결제 시 즉시 자동 해제 (`localStorage` 연동)
3. **관리자 전용 검수 모드 (`설정` 탭 최상단)**
   - 기본 PIN `2026` 입력 시 1~100화 전체 검수 잠금 해제 및 상단 헤더 검수 배지 표시
4. **Vercel 빌드 수정**
   - `@neondatabase/serverless` 의존성 포함 완료

## 실행 방법
```bash
npm install
npm run dev
```
