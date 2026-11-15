export interface WebtoonCut {
  num?: number;
  shot?: string;
  img: string;
  showImage?: boolean;
  caption: string;
  scene?: string;
  dialogue?: string;
  narration?: string;
  sfx?: string;
}

export interface WebtoonCut {
  img: string;
  caption: string;
}

export interface ScriptLine {
  cut: string;
  scene: string;
  dialogue: string;
}

export interface WebtoonItem {
  id: string;
  title: string;
  author: string;
  genre: string;
  badge: string;
  subtitle: string;
  description: string;
  poster: string;
  ep1_title: string;
  ep2_title: string;
  ep1_subtitle: string;
  stats: { eps: string; cuts: string; perk: string };
  characters: CharacterInfo[];
  cuts: WebtoonCut[];
  script_lines: ScriptLine[];
  subscribers: number;
  views: number;
  likes: number;
}

export interface CommentItem {
  id: number;
  webtoon_id: string;
  author_name: string;
  tier_badge: string;
  content: string;
  created_at: string;
}

export interface SubscriptionItem {
  id: number;
  webtoon_id: string | null;
  customer_name: string;
  customer_email: string;
  tier_name: string;
  price_krw: number;
  creator_share_krw: number;
  platform_share_krw: number;
  billing_key: string | null;
  referral_code: string | null;
  status: string;
  created_at: string;
}

export const DEFAULT_WEBTOONS: WebtoonItem[] = [
  {
    id: "seoul-moon",
    title: "달을 비추는 옥탑",
    author: "달빛 스튜디오",
    genre: "드라마",
    badge: "2026 청춘 리얼리즘 기대작 오리지널 웹툰",
    subtitle: "화려한 강남의 야경, 옥탑방에서 바라보는 달",
    description:
      "1994년 전설적인 명작 《서울의 달》을 2026년 현대판 코인, 배달 라이더, 청년 부동산과 취준생의 시선으로 완벽하게 재해석한 입체적 청춘 군상극.",
    poster: "/images/poster-seoul-moon.jpg",
    ep1_title: "제1화: 옥탑방에서 보이는 달",
    ep2_title: "제2화: 리스차와 사채 독촉장",
    ep1_subtitle: "총 50컷 웹툰 원고 뷰어 & 콘티 스크립트",
    stats: { eps: "100화 완결", cuts: "50~60컷", perk: "2주 선공개" },
    characters: [
      {
        badge: "주연 · 27세",
        badgeClass: "text-indigo-400 bg-indigo-950 border-indigo-800",
        ref: "한석규 役 각색",
        name: "강홍식",
        role: "수입차 딜러 & 암호화폐 리딩방 인플루언서",
        quote:
          '"저기 아래 보이는 불빛 하나하나가 다 돈이야. 춘섭아, 넌 딱 3년만 나 믿고 따라와라."',
        trait: "화려한 포마드 헤어, 겉은 명품 리스차, 속은 사채 독촉장.",
        desire: "수단방법 가리지 않고 강남 아파트 입성.",
      },
      {
        badge: "주연 · 27세",
        badgeClass: "text-emerald-400 bg-emerald-950 border-emerald-800",
        ref: "최민식 役 각색",
        name: "박춘섭",
        role: "주간 배달 라이더 & 야간 자동차 정비소 인턴",
        quote:
          '"지분이고 나발이고 내 돈 5천만 원 통장에 찍힐 때까지 나 여기서 한 발자국도 안 나가."',
        trait: "건장한 체격, 묵직하고 듬직하며 거짓말 못 하는 순박함.",
        desire: "정직하게 일해 내 정비소를 차리는 것.",
      },
      {
        badge: "주연 · 25세",
        badgeClass: "text-purple-400 bg-purple-950 border-purple-800",
        ref: "채시라 役 각색",
        name: "윤영숙",
        role: "마케팅 대행사 계약직 & 파트타임 바리스타",
        quote:
          '"밤 11시 넘었어요. 남의 동네 와서 민폐 좀 부리지 마시죠?"',
        trait: "똑 부러지는 세련된 칼단발, 현실적이고 강한 자립심.",
        desire: "계약직 탈출과 나만의 온전한 주거 공간.",
      },
    ],
    cuts: [
      {
        img: "/images/cut-alley.jpg",
        caption:
          "[컷 41~49] 신림동 골목길에서 피곤한 얼굴의 영숙과 첫 눈을 마주치는 춘섭, 그리고 달빛 소묘.",
      },
      {
        img: "/images/cut-station.jpg",
        caption:
          "[컷 13~16] 서울역 광장에 상경하여 거대한 전광판에 압도당하는 시골 청년 춘섭.",
      },
      {
        img: "/images/cut-rooftop.jpg",
        caption:
          "[컷 25~31] 옥탑방 마당에서 5천만 원 전세금을 들먹이며 격렬하게 다투는 춘섭과 홍식.",
      },
    ],
    script_lines: [
      {
        cut: "컷 1~12",
        scene: "2026년 늦가을 밤, 강남 테헤란로 고층 빌딩 숲과 대비되는 신림동 달동네 옥탑방.",
        dialogue: "홍식(독백): 서울은 거대한 수족관이다. 물고기가 되든, 낚시꾼이 되든 둘 중 하나지.",
      },
      {
        cut: "컷 13~24",
        scene: "서울역 광장 앞, 낡은 캐리어를 끌고 상경한 박춘섭이 전광판의 코인 광고를 올려다본다.",
        dialogue: "춘섭: 형! 나 서울역 도착했어. 근데 여기 건물들이 왜 이렇게 다 높아?",
      },
      {
        cut: "컷 25~40",
        scene: "보증금 5천만 원을 둘러싼 옥탑방 마당의 대치. 홍식은 리스차 키를 흔들며 큰소리친다.",
        dialogue: "홍식: 야, 그 5천 내가 코인으로 3배 불려놨다니까? 딱 일주일만 기다려!",
      },
      {
        cut: "컷 41~50",
        scene: "편의점 앞 골목길, 퇴근하던 영숙이 소란스러운 옥탑방 쪽을 올려다보며 한숨을 쉰다.",
        dialogue: "영숙: 밤 11시 넘었어요. 남의 동네 와서 민폐 좀 부리지 마시죠?",
      },
    ],
    subscribers: 142,
    views: 4820,
    likes: 128,
  },
];

export const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: 1,
    webtoon_id: "seoul-moon",
    author_name: "옥탑방달빛",
    tier_badge: "달동네 스페셜",
    content: "90년대 서울의 달 감성을 2026년 코인과 배달 라이더로 풀어낸 연출이 소름 돋네요. 2화 선공개 바로 달립니다!",
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: 2,
    webtoon_id: "seoul-moon",
    author_name: "춘섭이화이팅",
    tier_badge: "VIP 후원자",
    content: "홍식이 캐릭터 너무 얄미운데 현실적이라 몰입감 최고예요. 6:4 창작자 수익 배분 구조도 응원합니다.",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];
