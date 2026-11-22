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

## 운영 환경 설정

Vercel의 Production 환경 변수를 설정한 뒤 새로 배포합니다. 비공개 키의 이름에 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.

- 독자·작가 비밀번호 재설정: `RESEND_API_KEY`, `RESET_FROM_EMAIL`(인증된 발신 주소), `RESET_PUBLIC_ORIGIN`(운영 HTTPS 주소)을 설정합니다. 재설정 링크는 30분 동안 한 번 쓸 수 있습니다. 총괄 관리자 인증은 기존 관리자 환경 변수로 관리합니다.
- PortOne V2: `PORTONE_STORE_ID`, `PORTONE_CHANNEL_KEY`, `PORTONE_API_SECRET`, `PORTONE_WEBHOOK_SECRET`을 설정합니다. 웹훅 주소는 운영 도메인의 `/api/payments/webhook`입니다. 결제 완료와 취소·부분취소 이벤트를 등록하고 테스트 채널에서 결제 → 열람 → 취소 → 열람 종료 및 정산을 검증합니다. 운영 채널을 확인한 뒤에만 `PAYMENTS_ENABLED=true`로 새 주문을 활성화합니다.
- 작품 이용권은 현재 화면에 표시된 2,900원·30일 일회성 결제입니다. 수수료는 총괄 관리자가 PG 명세서를 기준으로 등록합니다. 확인된 결제의 배분액은 (결제액 − 환불액 − 실제 수수료)의 70%를 작가에게, 나머지를 플랫폼에 배분합니다. 화면은 집계액을 표시하며 송금은 운영에서 처리합니다.
