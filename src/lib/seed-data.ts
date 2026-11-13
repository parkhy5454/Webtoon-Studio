export interface CharacterInfo {
  badge: string;
  badgeClass: string;
  ref: string;
  name: string;
  role: string;
  quote: string;
  trait: string;
  desire: string;
}

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
    stats: { eps: "100화 완결", cuts: "50컷", perk: "2주 선공개" },
    characters: [
      {
        badge: "주연 · 27세",
        badgeClass: "text-indigo-400 bg-indigo-950 border-indigo-800",
        ref: "한석규 役 각색",
        name: "강홍식",
        role: "수입차 딜러 & 암호화폐 리딩방 인플루언서",
        quote: '"저기 아래 보이는 불빛 하나하나가 다 돈이야. 춘섭아, 넌 딱 3년만 나 믿고 따라와라."',
        trait: "화려한 포마드 헤어, 겉은 명품 리스차, 속은 사채 독촉장.",
        desire: "수단방법 가리지 않고 강남 아파트 입성.",
      },
      {
        badge: "주연 · 27세",
        badgeClass: "text-emerald-400 bg-emerald-950 border-emerald-800",
        ref: "최민식 役 각색",
        name: "박춘섭",
        role: "주간 배달 라이더 & 야간 자동차 정비소 인턴",
        quote: '"지분이고 나발이고 내 돈 5천만 원 통장에 찍힐 때까지 나 여기서 한 발자국도 안 나가."',
        trait: "건장한 체격, 묵직하고 듬직하며 거짓말 못 하는 순박함.",
        desire: "정직하게 일해 내 정비소를 차리는 것.",
      },
      {
        badge: "주연 · 25세",
        badgeClass: "text-purple-400 bg-purple-950 border-purple-800",
        ref: "채시라 役 각색",
        name: "윤영숙",
        role: "마케팅 대행사 계약직 & 파트타임 바리스타",
        quote: '"밤 11시 넘었어요. 남의 동네 와서 민폐 좀 부리지 마시죠?"',
        trait: "똑 부러지는 세련된 칼단발, 현실적이고 강한 자립심.",
        desire: "계약직 탈출과 나만의 온전한 주거 공간.",
      },
    ],
    cuts: [
      {
            "num": 1,
            "shot": "익스트림 롱샷 / 밤",
            "img": "/images/ep1-seq1-opening.jpg",
            "showImage": true,
            "caption": "[컷 1] 칠흑 같은 밤하늘 아래 번쩍이는 강남 빌딩 숲의 오색 야경.",
            "scene": "칠흑 같은 밤하늘 아래 번쩍이는 강남 빌딩 숲의 오색 야경.",
            "dialogue": "",
            "narration": "서울. 누군가에게는 하루에 수억이 오가는 욕망의 도시.",
            "sfx": ""
      },
      {
            "num": 2,
            "shot": "티틀 다운 / 밤",
            "img": "/images/ep1-seq1-opening.jpg",
            "showImage": false,
            "caption": "[컷 2] 카메라가 하향 팬 되면서 가파른 계단과 다닥다닥 붙은 신림동 달동네 골목길로 연결.",
            "scene": "카메라가 하향 팬 되면서 가파른 계단과 다닥다닥 붙은 신림동 달동네 골목길로 연결.",
            "dialogue": "",
            "narration": "누군가에게는 도망칠 곳 없는 신기루.",
            "sfx": ""
      },
      {
            "num": 3,
            "shot": "하이앵글 / 밤",
            "img": "/images/ep1-seq1-opening.jpg",
            "showImage": false,
            "caption": "[컷 3] 언덕 맨 꼭대기 낡은 슬라브 옥탑방 전경. 지붕 위 낡은 수신 안테나가 바람에 흔들림.",
            "scene": "언덕 맨 꼭대기 낡은 슬라브 옥탑방 전경. 지붕 위 낡은 수신 안테나가 바람에 흔들림.",
            "dialogue": "",
            "narration": "",
            "sfx": "(스스스... 우웅- 바람 소리)"
      },
      {
            "num": 4,
            "shot": "풀샷 / 밤",
            "img": "/images/ep1-seq1-opening.jpg",
            "showImage": false,
            "caption": "[컷 4] 옥탑방 앞 낡은 나무 평상. 명품 카피 수트를 입은 홍식이 구두를 벗은 채 누워있다.",
            "scene": "옥탑방 앞 낡은 나무 평상. 명품 카피 수트를 입은 홍식이 구두를 벗은 채 누워있다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 5,
            "shot": "클로즈업 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": true,
            "caption": "[컷 5] 홍식이 손에 든 삼다수 플라스틱 병. 병 안에는 투명한 쓴 소주가 들어있다.",
            "scene": "홍식이 손에 든 삼다수 플라스틱 병. 병 안에는 투명한 쓴 소주가 들어있다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 6,
            "shot": "미디엄 샷 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 6] 삼다수 병을 입에 털어 넣는 홍식. 목젖이 넘어가는 씁쓸한 표정.",
            "scene": "삼다수 병을 입에 털어 넣는 홍식. 목젖이 넘어가는 씁쓸한 표정.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 7,
            "shot": "아이레벨 샷 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 7] 홍식이 평상에 누워 아래를 향해 손을 뻗어 빌딩 숲 야경을 움켜쥐듯 손가락을 쥐어짠다.",
            "scene": "홍식이 평상에 누워 아래를 향해 손을 뻗어 빌딩 숲 야경을 움켜쥐듯 손가락을 쥐어짠다.",
            "dialogue": "홍식 (대사): \"저기 아래 보이는 불빛 하나하나가 다 돈이야, 돈...\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 8,
            "shot": "클로즈업 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 8] 홍식의 눈빛에 맺히는 독기 어린 욕망.",
            "scene": "홍식의 눈빛에 맺히는 독기 어린 욕망.",
            "dialogue": "홍식 (대사): \"내 반드시 이 바닥 탑이 되어서 저 불빛 중 하나는 내 걸로 만든다.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 9,
            "shot": "버스트 샷 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 9] 홍식이 휴대폰을 들어 춘섭의 사진을 내려다본다. 슬쩍 미소를 지음.",
            "scene": "홍식이 휴대폰을 들어 춘섭의 사진을 내려다본다. 슬쩍 미소를 지음.",
            "dialogue": "홍식 (대사): \"춘섭아... 넌 딱 3년만 나 믿고 따라오면 돼.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 10,
            "shot": "슬로우 팬 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 10] 옥탑방 빨랫줄에 걸린 다 헤진 명품 스타일 넥타이가 바람에 나부낀다.",
            "scene": "옥탑방 빨랫줄에 걸린 다 헤진 명품 스타일 넥타이가 바람에 나부낀다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 11,
            "shot": "클로즈업 / 밤",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 11] 지붕 위에 휘영청 밝게 뜬 차가운 하얀 달.",
            "scene": "지붕 위에 휘영청 밝게 뜬 차가운 하얀 달.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 12,
            "shot": "암전 & 타이틀 카드",
            "img": "/images/ep1-seq1-ambition.jpg",
            "showImage": false,
            "caption": "[컷 12] 《달을 비추는 옥탑》 - 제1화: 옥탑방에서 보이는 달",
            "scene": "",
            "dialogue": "",
            "narration": "《달을 비추는 옥탑》 - 제1화: 옥탑방에서 보이는 달",
            "sfx": ""
      },
      {
            "num": 13,
            "shot": "익스트림 롱샷 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": true,
            "caption": "[컷 13] 서울역 광장 전경. 수많은 이들이 바쁘게 이동하는 모습.",
            "scene": "서울역 광장 전경. 수많은 이들이 바쁘게 이동하는 모습.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 14,
            "shot": "풀샷 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": false,
            "caption": "[컷 14] 거대한 군용 등산 가방을 메고 서울역 출구로 나오는 춘섭. 바지 밑단에 흙이 묻어있음.",
            "scene": "거대한 군용 등산 가방을 메고 서울역 출구로 나오는 춘섭. 바지 밑단에 흙이 묻어있음.",
            "dialogue": "",
            "narration": "",
            "sfx": "(와글와글 웅성거림)"
      },
      {
            "num": 15,
            "shot": "클로즈업 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": false,
            "caption": "[컷 15] 춘섭의 얼떨떨한 눈빛. 거대한 전광판과 빌딩들을 올려다보며 감탄한다.",
            "scene": "춘섭의 얼떨떨한 눈빛. 거대한 전광판과 빌딩들을 올려다보며 감탄한다.",
            "dialogue": "춘섭 (속마음): *와... 진짜 서울은 서울이네. 사람이 웰케 많냐.*",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 16,
            "shot": "미디엄 샷 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": false,
            "caption": "[컷 16] 공중전화 부스 옆에서 낡은 폴더폰을 귀에 대고 안절부절못하는 춘섭.",
            "scene": "공중전화 부스 옆에서 낡은 폴더폰을 귀에 대고 안절부절못하는 춘섭.",
            "dialogue": "춘섭 (대사): \"홍식이 이 자식... 수입차 딜러 대표라면서 왜 전화를 안 받아?\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 17,
            "shot": "로우앵글 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": false,
            "caption": "[컷 17] 신림동 가파른 언덕 골목길을 땀을 뻘뻘 흘리며 등산 가방을 메고 올라가는 춘섭.",
            "scene": "신림동 가파른 언덕 골목길을 땀을 뻘뻘 흘리며 등산 가방을 메고 올라가는 춘섭.",
            "dialogue": "",
            "narration": "",
            "sfx": "(헉... 헉... 쿵쾅쿵쾅)"
      },
      {
            "num": 18,
            "shot": "풀샷 / 낮",
            "img": "/images/cut-station.jpg",
            "showImage": false,
            "caption": "[컷 18] 'OO빌라 302호' 문 앞. 춘섭이 주소를 확인하고 문고리를 잡는다.",
            "scene": "'OO빌라 302호' 문 앞. 춘섭이 주소를 확인하고 문고리를 잡는다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 19,
            "shot": "POV 샷 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": true,
            "caption": "[컷 19] 문을 열자마자 보이는 문 안쪽 장면. 붉은색 강제집행 경고장과 사채 독촉장 수십 장이 문에 빽빽하게 붙어있음.",
            "scene": "문을 열자마자 보이는 문 안쪽 장면. 붉은색 강제집행 경고장과 사채 독촉장 수십 장이 문에 빽빽하게 붙어있음.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 20,
            "shot": "줌인 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": false,
            "caption": "[컷 20] 독촉장에 찍힌 붉은 도장: '최종 경고', '체납액 8,700만 원'.",
            "scene": "독촉장에 찍힌 붉은 도장: '최종 경고', '체납액 8,700만 원'.",
            "dialogue": "춘섭 (대사): \"어...? 이게 다 뭐야...?\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 21,
            "shot": "풀샷 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": false,
            "caption": "[컷 21] 사채 독촉장과 컵라면 용기, 빈 소주병이 사방에 굴러다니는 단칸방 한가운데 찌그러져 자고 있는 홍식.",
            "scene": "사채 독촉장과 컵라면 용기, 빈 소주병이 사방에 굴러다니는 단칸방 한가운데 찌그러져 자고 있는 홍식.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 22,
            "shot": "클로즈업 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": false,
            "caption": "[컷 22] 춘섭이 등산 가방을 바닥에 쿵 떨어뜨린다.",
            "scene": "춘섭이 등산 가방을 바닥에 쿵 떨어뜨린다.",
            "dialogue": "",
            "narration": "",
            "sfx": "(쿵-!)"
      },
      {
            "num": 23,
            "shot": "미디엄 샷 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": false,
            "caption": "[컷 23] 홍식이 눈을 부비며 일어남. 명품 셔츠는 구겨져 있고 머리는 까치집.",
            "scene": "홍식이 눈을 부비며 일어남. 명품 셔츠는 구겨져 있고 머리는 까치집.",
            "dialogue": "홍식 (하품): \"어...? 춘섭이 너 벌써 왔냐? 연락 좀 하고 오지...\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 24,
            "shot": "버스트 샷 / 낮",
            "img": "/images/ep1-seq2-debt.jpg",
            "showImage": false,
            "caption": "[컷 24] 춘섭이 떨리는 손으로 독촉장을 집어 들며 홍식을 노려본다.",
            "scene": "춘섭이 떨리는 손으로 독촉장을 집어 들며 홍식을 노려본다.",
            "dialogue": "춘섭 (분노): \"강홍식... 너 수입차 매장 대표라며?! 이 독촉장은 대체 다 뭐야!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 25,
            "shot": "풀샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": true,
            "caption": "[컷 25] 춘섭이 홍식의 멱살을 잡고 단칸방 밖 옥탑방 마당으로 끌고 나옴.",
            "scene": "춘섭이 홍식의 멱살을 잡고 단칸방 밖 옥탑방 마당으로 끌고 나옴.",
            "dialogue": "",
            "narration": "",
            "sfx": "(콰당탕! 털썩!)"
      },
      {
            "num": 26,
            "shot": "로우앵글 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 26] 바닥에 넘어진 홍식을 내려다보며 사호 지르는 춘섭.",
            "scene": "바닥에 넘어진 홍식을 내려다보며 사호 지르는 춘섭.",
            "dialogue": "춘섭 (대사): \"내 전세금 5천만 원 내놔! 그거 우리 어머니 수술비에 내 정비소 밑천이야!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 27,
            "shot": "클로즈업 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 27] 홍식이 옷 흙을 털어내며 뻔뻔하게 미소를 지음.",
            "scene": "홍식이 옷 흙을 털어내며 뻔뻔하게 미소를 지음.",
            "dialogue": "홍식 (대사): \"야 야, 박춘섭. 칼로 물 베기냐? 친구 사이에 무슨 5천만 원 가지고 소리를 질러?\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 28,
            "shot": "투샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 28] 춘섭이 주먹을 쥐어틀며 홍식에게 다가감.",
            "scene": "춘섭이 주먹을 쥐어틀며 홍식에게 다가감.",
            "dialogue": "춘섭 (대사): \"너 오늘 돈 안 내놓으면 경찰서 가자. 나 진짜 너 안 봐준다!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 29,
            "shot": "미디엄 샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 29] 홍식이 얼른 춘섭의 어깨를 잡고 눈을 맞추며 설득 모드로 들어감. 눈빛이 싹 변함.",
            "scene": "홍식이 얼른 춘섭의 어깨를 잡고 눈을 맞추며 설득 모드로 들어감. 눈빛이 싹 변함.",
            "dialogue": "홍식 (대사): \"춘섭아, 잘 들어. 사업하는 놈이 일시적 자금 유동성 위기 좀 겪을 수 있어. 원래 크게 먹으려면 판을 넓혀야 되는 거야.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 30,
            "shot": "클로즈업 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 30] 춘섭의 기가 막힌 표정.",
            "scene": "춘섭의 기가 막힌 표정.",
            "dialogue": "춘섭 (대사): \"유동성...? 코인 투자해서 홀랑 날린 게 유동성 위기냐?!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 31,
            "shot": "버스트 샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 31] 홍식이 손가락 세 개를 펴 보이며 과장된 가스라이팅 제스처.",
            "scene": "홍식이 손가락 세 개를 펴 보이며 과장된 가스라이팅 제스처.",
            "dialogue": "홍식 (대사): \"내가 이번에 새로 들어가는 암호화폐 리딩방 프로젝트가 있어. 딱 6개월만 나 믿어줘. 네 지분 20% 보장한다.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 32,
            "shot": "로우앵글 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 32] 춘섭이 홍식의 옷자락을 꽉 쥔다.",
            "scene": "춘섭이 홍식의 옷자락을 꽉 쥔다.",
            "dialogue": "춘섭 (대사): \"지분이고 나발이고 내 돈 5천만 원 통장에 찍힐 때까지 나 여기서 한 발자국도 안 나가.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 33,
            "shot": "풀샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 33] 홍식이 옥탑방 평상을 가리키며 활짝 웃는다.",
            "scene": "홍식이 옥탑방 평상을 가리키며 활짝 웃는다.",
            "dialogue": "홍식 (대사): \"좋아! 오늘부터 옥탑방 동거 시작이다! 밑바닥부터 같이 올라가는 거야!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 34,
            "shot": "미디엄 샷 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 34] 춘섭이 한숨을 쉬며 옥탑방 마당 평상에 등산 가방을 내던진다.",
            "scene": "춘섭이 한숨을 쉬며 옥탑방 마당 평상에 등산 가방을 내던진다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 35,
            "shot": "클로즈업 / 낮",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 35] 춘섭의 씁쓸한 한숨.",
            "scene": "춘섭의 씁쓸한 한숨.",
            "dialogue": "춘섭 (속마음): *망했다... 서울 오자마자 길거리에 나앉게 생겼네.*",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 36,
            "shot": "시간 경과 / 석양",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 36] 옥탑방 뒤로 붉은 노을이 지며 밤으로 변해감.",
            "scene": "옥탑방 뒤로 붉은 노을이 지며 밤으로 변해감.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 37,
            "shot": "풀샷 / 밤",
            "img": "/images/cut-rooftop.jpg",
            "showImage": false,
            "caption": "[컷 37] 옥탑방 평상에 앉아 컵라면을 먹고 있는 홍식과 춘섭.",
            "scene": "옥탑방 평상에 앉아 컵라면을 먹고 있는 홍식과 춘섭.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 38,
            "shot": "하이앵글 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": true,
            "caption": "[컷 38] 옥탑방 건너편 반지하 빌라 대문이 열리는 소리.",
            "scene": "옥탑방 건너편 반지하 빌라 대문이 열리는 소리.",
            "dialogue": "",
            "narration": "",
            "sfx": "(삐걱- 쾅)"
      },
      {
            "num": 39,
            "shot": "풀샷 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": false,
            "caption": "[컷 39] 단정한 슬랙스와 셔츠 차림의 영숙이 지친 기색으로 가방을 메고 걸어 나온다.",
            "scene": "단정한 슬랙스와 셔츠 차림의 영숙이 지친 기색으로 가방을 메고 걸어 나온다.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 40,
            "shot": "미디엄 샷 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": false,
            "caption": "[컷 40] 평상에서 컵라면 국물을 들키며 고성을 지르던 홍식과 춘섭.",
            "scene": "평상에서 컵라면 국물을 들키며 고성을 지르던 홍식과 춘섭.",
            "dialogue": "홍식 (대사): \"아 거 라면 좀 조용히 먹어라! 짠순이처럼 아껴먹지 말고!\"\n춘섭 (대사): \"네가 사줬냐?! 내가 내 돈으로 산 라면이다!\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 41,
            "shot": "로우앵글 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": false,
            "caption": "[컷 41] 영숙이 계단 위를 올려다보며 싸늘한 눈빛을 보냄.",
            "scene": "영숙이 계단 위를 올려다보며 싸늘한 눈빛을 보냄.",
            "dialogue": "영숙 (대사): \"아저씨들, 밤 11시 넘었어요. 남의 동네 와서 민폐 좀 부리지 마시죠?\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 42,
            "shot": "클로즈업 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": false,
            "caption": "[컷 42] 영숙의 차갑고 똑 부러지는 눈빛과 세련된 칼단발.",
            "scene": "영숙의 차갑고 똑 부러지는 눈빛과 세련된 칼단발.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 43,
            "shot": "클로즈업 / 밤",
            "img": "/images/ep1-seq4-ramen.jpg",
            "showImage": false,
            "caption": "[컷 43] 춘섭이 라면 젓가락을 멈추고 멍하니 영숙을 바라본다. 얼떨떨한 표정.",
            "scene": "춘섭이 라면 젓가락을 멈추고 멍하니 영숙을 바라본다. 얼떨떨한 표정.",
            "dialogue": "",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 44,
            "shot": "미디엄 샷 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": true,
            "caption": "[컷 44] 홍식은 영숙을 보자마자 입꼬리를 올리며 능글맞은 미소를 지음.",
            "scene": "홍식은 영숙을 보자마자 입꼬리를 올리며 능글맞은 미소를 지음.",
            "dialogue": "홍식 (대사): \"어라? 옆집에 이런 미인이 살고 계셨나? 미안하게 됐습니다, 이웃사촌님.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 45,
            "shot": "미디엄 샷 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 45] 영숙이 홍식의 능글맞은 태도를 무시하고 한심하다는 듯 고개를 돌려 골목길 아래로 내려간다.",
            "scene": "영숙이 홍식의 능글맞은 태도를 무시하고 한심하다는 듯 고개를 돌려 골목길 아래로 내려간다.",
            "dialogue": "",
            "narration": "",
            "sfx": "(터벅... 터벅...)"
      },
      {
            "num": 46,
            "shot": "클로즈업 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 46] 멀어져 가는 영숙의 뒷모습을 계속 바라보는 춘섭. 심장 소리 효과음.",
            "scene": "멀어져 가는 영숙의 뒷모습을 계속 바라보는 춘섭. 심장 소리 효과음.",
            "dialogue": "",
            "narration": "",
            "sfx": "(두근... 두근...)"
      },
      {
            "num": 47,
            "shot": "버스트 샷 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 47] 홍식이 춘섭의 멍한 얼굴을 툭 친다.",
            "scene": "홍식이 춘섭의 멍한 얼굴을 툭 친다.",
            "dialogue": "홍식 (대사): \"왜? 첫눈에 반하기라도 했냐? 야 야, 꿈 깨라. 딱 봐도 똑똑하고 차가운 서울 여자야.\"",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 48,
            "shot": "미디엄 샷 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 48] 춘섭이 주먹을 불끈 쥐며 멀리 강남의 야경과 영숙이 사라진 골목을 번갈아 본다.",
            "scene": "춘섭이 주먹을 불끈 쥐며 멀리 강남의 야경과 영숙이 사라진 골목을 번갈아 본다.",
            "dialogue": "춘섭 (속마음): *서울에서 처음 마주친 차가운 눈빛... 그런데 왜 이렇게 가슴이 뛰는 걸까.*",
            "narration": "",
            "sfx": ""
      },
      {
            "num": 49,
            "shot": "익스트림 롱샷 / 밤",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 49] 신림동 옥탑방과 그 너머로 낮게 내려앉은 차가운 하얀 달, 그리고 번쩍이는 도심의 불빛들.",
            "scene": "신림동 옥탑방과 그 너머로 낮게 내려앉은 차가운 하얀 달, 그리고 번쩍이는 도심의 불빛들.",
            "dialogue": "",
            "narration": "그렇게 나의 미련하고도 뜨거운 서울살이가 시작되었다.",
            "sfx": ""
      },
      {
            "num": 50,
            "shot": "페이드 아웃 & 페이드 인",
            "img": "/images/cut-alley.jpg",
            "showImage": false,
            "caption": "[컷 50] 《달을 비추는 옥탑》 제1화 끝 / 다음 화에 계속 (2화 예고: 배달 라이더 춘섭의 혹독한 첫날)",
            "scene": "",
            "dialogue": "",
            "narration": "《달을 비추는 옥탑》 제1화 끝 / 다음 화에 계속 (2화 예고: 배달 라이더 춘섭의 혹독한 첫날)",
            "sfx": ""
      }
],
    script_lines: [
      {
            "cut": "컷 1 (익스트림 롱샷 / 밤)",
            "scene": "칠흑 같은 밤하늘 아래 번쩍이는 강남 빌딩 숲의 오색 야경.",
            "dialogue": "서울. 누군가에게는 하루에 수억이 오가는 욕망의 도시."
      },
      {
            "cut": "컷 2 (티틀 다운 / 밤)",
            "scene": "카메라가 하향 팬 되면서 가파른 계단과 다닥다닥 붙은 신림동 달동네 골목길로 연결.",
            "dialogue": "누군가에게는 도망칠 곳 없는 신기루."
      },
      {
            "cut": "컷 3 (하이앵글 / 밤)",
            "scene": "언덕 맨 꼭대기 낡은 슬라브 옥탑방 전경. 지붕 위 낡은 수신 안테나가 바람에 흔들림.",
            "dialogue": "(스스스... 우웅- 바람 소리)"
      },
      {
            "cut": "컷 4 (풀샷 / 밤)",
            "scene": "옥탑방 앞 낡은 나무 평상. 명품 카피 수트를 입은 홍식이 구두를 벗은 채 누워있다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 5 (클로즈업 / 밤)",
            "scene": "홍식이 손에 든 삼다수 플라스틱 병. 병 안에는 투명한 쓴 소주가 들어있다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 6 (미디엄 샷 / 밤)",
            "scene": "삼다수 병을 입에 털어 넣는 홍식. 목젖이 넘어가는 씁쓸한 표정.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 7 (아이레벨 샷 / 밤)",
            "scene": "홍식이 평상에 누워 아래를 향해 손을 뻗어 빌딩 숲 야경을 움켜쥐듯 손가락을 쥐어짠다.",
            "dialogue": "홍식 (대사): \"저기 아래 보이는 불빛 하나하나가 다 돈이야, 돈...\""
      },
      {
            "cut": "컷 8 (클로즈업 / 밤)",
            "scene": "홍식의 눈빛에 맺히는 독기 어린 욕망.",
            "dialogue": "홍식 (대사): \"내 반드시 이 바닥 탑이 되어서 저 불빛 중 하나는 내 걸로 만든다.\""
      },
      {
            "cut": "컷 9 (버스트 샷 / 밤)",
            "scene": "홍식이 휴대폰을 들어 춘섭의 사진을 내려다본다. 슬쩍 미소를 지음.",
            "dialogue": "홍식 (대사): \"춘섭아... 넌 딱 3년만 나 믿고 따라오면 돼.\""
      },
      {
            "cut": "컷 10 (슬로우 팬 / 밤)",
            "scene": "옥탑방 빨랫줄에 걸린 다 헤진 명품 스타일 넥타이가 바람에 나부낀다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 11 (클로즈업 / 밤)",
            "scene": "지붕 위에 휘영청 밝게 뜬 차가운 하얀 달.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 12 (암전 & 타이틀 카드)",
            "scene": "《달을 비추는 옥탑》 - 제1화: 옥탑방에서 보이는 달",
            "dialogue": "《달을 비추는 옥탑》 - 제1화: 옥탑방에서 보이는 달"
      },
      {
            "cut": "컷 13 (익스트림 롱샷 / 낮)",
            "scene": "서울역 광장 전경. 수많은 이들이 바쁘게 이동하는 모습.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 14 (풀샷 / 낮)",
            "scene": "거대한 군용 등산 가방을 메고 서울역 출구로 나오는 춘섭. 바지 밑단에 흙이 묻어있음.",
            "dialogue": "(와글와글 웅성거림)"
      },
      {
            "cut": "컷 15 (클로즈업 / 낮)",
            "scene": "춘섭의 얼떨떨한 눈빛. 거대한 전광판과 빌딩들을 올려다보며 감탄한다.",
            "dialogue": "춘섭 (속마음): *와... 진짜 서울은 서울이네. 사람이 웰케 많냐.*"
      },
      {
            "cut": "컷 16 (미디엄 샷 / 낮)",
            "scene": "공중전화 부스 옆에서 낡은 폴더폰을 귀에 대고 안절부절못하는 춘섭.",
            "dialogue": "춘섭 (대사): \"홍식이 이 자식... 수입차 딜러 대표라면서 왜 전화를 안 받아?\""
      },
      {
            "cut": "컷 17 (로우앵글 / 낮)",
            "scene": "신림동 가파른 언덕 골목길을 땀을 뻘뻘 흘리며 등산 가방을 메고 올라가는 춘섭.",
            "dialogue": "(헉... 헉... 쿵쾅쿵쾅)"
      },
      {
            "cut": "컷 18 (풀샷 / 낮)",
            "scene": "'OO빌라 302호' 문 앞. 춘섭이 주소를 확인하고 문고리를 잡는다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 19 (POV 샷 / 낮)",
            "scene": "문을 열자마자 보이는 문 안쪽 장면. 붉은색 강제집행 경고장과 사채 독촉장 수십 장이 문에 빽빽하게 붙어있음.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 20 (줌인 / 낮)",
            "scene": "독촉장에 찍힌 붉은 도장: '최종 경고', '체납액 8,700만 원'.",
            "dialogue": "춘섭 (대사): \"어...? 이게 다 뭐야...?\""
      },
      {
            "cut": "컷 21 (풀샷 / 낮)",
            "scene": "사채 독촉장과 컵라면 용기, 빈 소주병이 사방에 굴러다니는 단칸방 한가운데 찌그러져 자고 있는 홍식.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 22 (클로즈업 / 낮)",
            "scene": "춘섭이 등산 가방을 바닥에 쿵 떨어뜨린다.",
            "dialogue": "(쿵-!)"
      },
      {
            "cut": "컷 23 (미디엄 샷 / 낮)",
            "scene": "홍식이 눈을 부비며 일어남. 명품 셔츠는 구겨져 있고 머리는 까치집.",
            "dialogue": "홍식 (하품): \"어...? 춘섭이 너 벌써 왔냐? 연락 좀 하고 오지...\""
      },
      {
            "cut": "컷 24 (버스트 샷 / 낮)",
            "scene": "춘섭이 떨리는 손으로 독촉장을 집어 들며 홍식을 노려본다.",
            "dialogue": "춘섭 (분노): \"강홍식... 너 수입차 매장 대표라며?! 이 독촉장은 대체 다 뭐야!\""
      },
      {
            "cut": "컷 25 (풀샷 / 낮)",
            "scene": "춘섭이 홍식의 멱살을 잡고 단칸방 밖 옥탑방 마당으로 끌고 나옴.",
            "dialogue": "(콰당탕! 털썩!)"
      },
      {
            "cut": "컷 26 (로우앵글 / 낮)",
            "scene": "바닥에 넘어진 홍식을 내려다보며 사호 지르는 춘섭.",
            "dialogue": "춘섭 (대사): \"내 전세금 5천만 원 내놔! 그거 우리 어머니 수술비에 내 정비소 밑천이야!\""
      },
      {
            "cut": "컷 27 (클로즈업 / 낮)",
            "scene": "홍식이 옷 흙을 털어내며 뻔뻔하게 미소를 지음.",
            "dialogue": "홍식 (대사): \"야 야, 박춘섭. 칼로 물 베기냐? 친구 사이에 무슨 5천만 원 가지고 소리를 질러?\""
      },
      {
            "cut": "컷 28 (투샷 / 낮)",
            "scene": "춘섭이 주먹을 쥐어틀며 홍식에게 다가감.",
            "dialogue": "춘섭 (대사): \"너 오늘 돈 안 내놓으면 경찰서 가자. 나 진짜 너 안 봐준다!\""
      },
      {
            "cut": "컷 29 (미디엄 샷 / 낮)",
            "scene": "홍식이 얼른 춘섭의 어깨를 잡고 눈을 맞추며 설득 모드로 들어감. 눈빛이 싹 변함.",
            "dialogue": "홍식 (대사): \"춘섭아, 잘 들어. 사업하는 놈이 일시적 자금 유동성 위기 좀 겪을 수 있어. 원래 크게 먹으려면 판을 넓혀야 되는 거야.\""
      },
      {
            "cut": "컷 30 (클로즈업 / 낮)",
            "scene": "춘섭의 기가 막힌 표정.",
            "dialogue": "춘섭 (대사): \"유동성...? 코인 투자해서 홀랑 날린 게 유동성 위기냐?!\""
      },
      {
            "cut": "컷 31 (버스트 샷 / 낮)",
            "scene": "홍식이 손가락 세 개를 펴 보이며 과장된 가스라이팅 제스처.",
            "dialogue": "홍식 (대사): \"내가 이번에 새로 들어가는 암호화폐 리딩방 프로젝트가 있어. 딱 6개월만 나 믿어줘. 네 지분 20% 보장한다.\""
      },
      {
            "cut": "컷 32 (로우앵글 / 낮)",
            "scene": "춘섭이 홍식의 옷자락을 꽉 쥔다.",
            "dialogue": "춘섭 (대사): \"지분이고 나발이고 내 돈 5천만 원 통장에 찍힐 때까지 나 여기서 한 발자국도 안 나가.\""
      },
      {
            "cut": "컷 33 (풀샷 / 낮)",
            "scene": "홍식이 옥탑방 평상을 가리키며 활짝 웃는다.",
            "dialogue": "홍식 (대사): \"좋아! 오늘부터 옥탑방 동거 시작이다! 밑바닥부터 같이 올라가는 거야!\""
      },
      {
            "cut": "컷 34 (미디엄 샷 / 낮)",
            "scene": "춘섭이 한숨을 쉬며 옥탑방 마당 평상에 등산 가방을 내던진다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 35 (클로즈업 / 낮)",
            "scene": "춘섭의 씁쓸한 한숨.",
            "dialogue": "춘섭 (속마음): *망했다... 서울 오자마자 길거리에 나앉게 생겼네.*"
      },
      {
            "cut": "컷 36 (시간 경과 / 석양)",
            "scene": "옥탑방 뒤로 붉은 노을이 지며 밤으로 변해감.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 37 (풀샷 / 밤)",
            "scene": "옥탑방 평상에 앉아 컵라면을 먹고 있는 홍식과 춘섭.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 38 (하이앵글 / 밤)",
            "scene": "옥탑방 건너편 반지하 빌라 대문이 열리는 소리.",
            "dialogue": "(삐걱- 쾅)"
      },
      {
            "cut": "컷 39 (풀샷 / 밤)",
            "scene": "단정한 슬랙스와 셔츠 차림의 영숙이 지친 기색으로 가방을 메고 걸어 나온다.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 40 (미디엄 샷 / 밤)",
            "scene": "평상에서 컵라면 국물을 들키며 고성을 지르던 홍식과 춘섭.",
            "dialogue": "홍식 (대사): \"아 거 라면 좀 조용히 먹어라! 짠순이처럼 아껴먹지 말고!\"\n춘섭 (대사): \"네가 사줬냐?! 내가 내 돈으로 산 라면이다!\""
      },
      {
            "cut": "컷 41 (로우앵글 / 밤)",
            "scene": "영숙이 계단 위를 올려다보며 싸늘한 눈빛을 보냄.",
            "dialogue": "영숙 (대사): \"아저씨들, 밤 11시 넘었어요. 남의 동네 와서 민폐 좀 부리지 마시죠?\""
      },
      {
            "cut": "컷 42 (클로즈업 / 밤)",
            "scene": "영숙의 차갑고 똑 부러지는 눈빛과 세련된 칼단발.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 43 (클로즈업 / 밤)",
            "scene": "춘섭이 라면 젓가락을 멈추고 멍하니 영숙을 바라본다. 얼떨떨한 표정.",
            "dialogue": "(연출 컷)"
      },
      {
            "cut": "컷 44 (미디엄 샷 / 밤)",
            "scene": "홍식은 영숙을 보자마자 입꼬리를 올리며 능글맞은 미소를 지음.",
            "dialogue": "홍식 (대사): \"어라? 옆집에 이런 미인이 살고 계셨나? 미안하게 됐습니다, 이웃사촌님.\""
      },
      {
            "cut": "컷 45 (미디엄 샷 / 밤)",
            "scene": "영숙이 홍식의 능글맞은 태도를 무시하고 한심하다는 듯 고개를 돌려 골목길 아래로 내려간다.",
            "dialogue": "(터벅... 터벅...)"
      },
      {
            "cut": "컷 46 (클로즈업 / 밤)",
            "scene": "멀어져 가는 영숙의 뒷모습을 계속 바라보는 춘섭. 심장 소리 효과음.",
            "dialogue": "(두근... 두근...)"
      },
      {
            "cut": "컷 47 (버스트 샷 / 밤)",
            "scene": "홍식이 춘섭의 멍한 얼굴을 툭 친다.",
            "dialogue": "홍식 (대사): \"왜? 첫눈에 반하기라도 했냐? 야 야, 꿈 깨라. 딱 봐도 똑똑하고 차가운 서울 여자야.\""
      },
      {
            "cut": "컷 48 (미디엄 샷 / 밤)",
            "scene": "춘섭이 주먹을 불끈 쥐며 멀리 강남의 야경과 영숙이 사라진 골목을 번갈아 본다.",
            "dialogue": "춘섭 (속마음): *서울에서 처음 마주친 차가운 눈빛... 그런데 왜 이렇게 가슴이 뛰는 걸까.*"
      },
      {
            "cut": "컷 49 (익스트림 롱샷 / 밤)",
            "scene": "신림동 옥탑방과 그 너머로 낮게 내려앉은 차가운 하얀 달, 그리고 번쩍이는 도심의 불빛들.",
            "dialogue": "그렇게 나의 미련하고도 뜨거운 서울살이가 시작되었다."
      },
      {
            "cut": "컷 50 (페이드 아웃 & 페이드 인)",
            "scene": "《달을 비추는 옥탑》 제1화 끝 / 다음 화에 계속 (2화 예고: 배달 라이더 춘섭의 혹독한 첫날)",
            "dialogue": "《달을 비추는 옥탑》 제1화 끝 / 다음 화에 계속 (2화 예고: 배달 라이더 춘섭의 혹독한 첫날)"
      }
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
