import type { WebtoonCut } from "./seed-data";

export interface EpisodeItem {
  epNumber: number;
  title: string;
  part: string;
  isFree: boolean;
  cuts: WebtoonCut[];
}

export const EPISODES_100: EpisodeItem[] = [
  {
    "epNumber": 1,
    "title": "제1화: 옥탑방에서 보이는 달",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": true,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[1화 - 컷 1] 강남 야경을 보며 야망을 품는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "강남 야경을 보며 야망을 품는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제1화 《옥탑방에서 보이는 달》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[1화 - 컷 2] 서울역에 상경한 춘섭의 첫걸음. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "서울역에 상경한 춘섭의 첫걸음. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[1화 - 컷 3] 사채 독촉장이 도배된 단칸방의 충격. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "사채 독촉장이 도배된 단칸방의 충격. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[1화 - 컷 4] 밤 11시 골목길, 영숙과의 첫 만남. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "밤 11시 골목길, 영숙과의 첫 만남. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[1화 - 컷 5] 제1화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제1화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 2,
    "title": "제2화: 리스차와 사채 독촉장",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": true,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[2화 - 컷 1] 수입차 매장에서 쫓겨나는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "수입차 매장에서 쫓겨나는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제2화 《리스차와 사채 독촉장》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[2화 - 컷 2] 배달 대행 앱을 켜는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "배달 대행 앱을 켜는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[2화 - 컷 3] 편의점 야간 알바 중인 영숙과의 재회. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "편의점 야간 알바 중인 영숙과의 재회. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[2화 - 컷 4] 달동네 언덕길, 춘섭의 땀방울. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "달동네 언덕길, 춘섭의 땀방울. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[2화 - 컷 5] 제2화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제2화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 3,
    "title": "제3화: 배달 라이더 첫 출근",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": true,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[3화 - 컷 1] 신림동 가파른 골목을 오르는 오토바이. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "신림동 가파른 골목을 오르는 오토바이. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제3화 《배달 라이더 첫 출근》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[3화 - 컷 2] 악성 고객의 갑질에 참는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "악성 고객의 갑질에 참는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[3화 - 컷 3] 영숙이 건넨 따뜻한 캔커피 한 잔. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "영숙이 건넨 따뜻한 캔커피 한 잔. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[3화 - 컷 4] 홍식의 수상한 밤 외출. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "홍식의 수상한 밤 외출. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[3화 - 컷 5] 제3화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제3화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 4,
    "title": "제4화: 5천만 원의 행방",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": true,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[4화 - 컷 1] 어머니 수술비를 떠올리는 춘섭. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "어머니 수술비를 떠올리는 춘섭. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제4화 《5천만 원의 행방》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[4화 - 컷 2] 코인 차트를 보며 눈이 뒤집힌 홍식. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "코인 차트를 보며 눈이 뒤집힌 홍식. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[4화 - 컷 3] 옥탑방 평상에서 벌어진 말다툼. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "옥탑방 평상에서 벌어진 말다툼. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[4화 - 컷 4] 영숙의 차가운 충고 한마디. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "영숙의 차가운 충고 한마디. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[4화 - 컷 5] 제4화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제4화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 5,
    "title": "제5화: 바리스타와 정비소 인턴",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": true,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[5화 - 컷 1] 카센터 기름때를 닦는 춘섭의 손. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "카센터 기름때를 닦는 춘섭의 손. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제5화 《바리스타와 정비소 인턴》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[5화 - 컷 2] 마케팅 대행사 계약직의 서러운 야근. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "마케팅 대행사 계약직의 서러운 야근. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[5화 - 컷 3] 서로의 고단함을 알아본 두 사람. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "서로의 고단함을 알아본 두 사람. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[5화 - 컷 4] 불 꺼진 옥탑방에 홀로 남은 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "불 꺼진 옥탑방에 홀로 남은 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[5화 - 컷 5] 제5화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제5화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 6,
    "title": "제6화: 수상한 리딩방 VIP",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[6화 - 컷 1] 강남 카페에서 투자자를 유혹하는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "강남 카페에서 투자자를 유혹하는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제6화 《수상한 리딩방 VIP》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[6화 - 컷 2] 허풍과 거짓으로 쌓아 올린 모래성. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "허풍과 거짓으로 쌓아 올린 모래성. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[6화 - 컷 3] 춘섭의 배달통에 담긴 도시락. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "춘섭의 배달통에 담긴 도시락. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[6화 - 컷 4] 골목길 가로등 아래 길어진 그림자. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "골목길 가로등 아래 길어진 그림자. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[6화 - 컷 5] 제6화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제6화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 7,
    "title": "제7화: 비 오는 날의 빗물받이",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[7화 - 컷 1] 옥탑방 천장에서 떨어지는 빗물. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "옥탑방 천장에서 떨어지는 빗물. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제7화 《비 오는 날의 빗물받이》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[7화 - 컷 2] 양동이를 받치며 웃는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "양동이를 받치며 웃는 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[7화 - 컷 3] 우산 없이 뛰는 영숙에게 우산을 씌워주는 손. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "우산 없이 뛰는 영숙에게 우산을 씌워주는 손. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[7화 - 컷 4] 심장이 쿵 내려앉는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "심장이 쿵 내려앉는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[7화 - 컷 5] 제7화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제7화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 8,
    "title": "제8화: 강남 아파트 모델하우스",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[8화 - 컷 1] 화려한 샹들리에 아래 선 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "화려한 샹들리에 아래 선 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제8화 《강남 아파트 모델하우스》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[8화 - 컷 2] 카드 한도 초과 알림에 굳은 표정. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "카드 한도 초과 알림에 굳은 표정. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[8화 - 컷 3] 청년 청약 통장을 바라보는 영숙. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "청년 청약 통장을 바라보는 영숙. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[8화 - 컷 4] 같은 서울, 다른 꿈을 꾸는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "같은 서울, 다른 꿈을 꾸는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[8화 - 컷 5] 제8화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제8화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 9,
    "title": "제9화: 사채업자 마 사장 등장",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[9화 - 컷 1] 옥탑방 대문을 두드리는 거친 발걸음. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "옥탑방 대문을 두드리는 거친 발걸음. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제9화 《사채업자 마 사장 등장》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[9화 - 컷 2] 홍식을 대신해 앞을 막아선 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "홍식을 대신해 앞을 막아선 춘섭. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[9화 - 컷 3] 일주일 유예를 받아낸 무모한 약속. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "일주일 유예를 받아낸 무모한 약속. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[9화 - 컷 4] 춘섭의 등 뒤에 숨은 홍식의 비겁한 눈빛. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "춘섭의 등 뒤에 숨은 홍식의 비겁한 눈빛. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[9화 - 컷 5] 제9화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제9화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 10,
    "title": "제10화: 정비소 사장의 인정",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[10화 - 컷 1] 엔진 소리를 귀로 잡아내는 춘섭의 재능. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "엔진 소리를 귀로 잡아내는 춘섭의 재능. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제10화 《정비소 사장의 인정》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[10화 - 컷 2] 첫 월급 봉투를 쥔 묵직한 손. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "첫 월급 봉투를 쥔 묵직한 손. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[10화 - 컷 3] 영숙에게 작은 케이크를 건네는 밤. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "영숙에게 작은 케이크를 건네는 밤. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[10화 - 컷 4] 멀리서 이를 질투 어린 눈으로 보는 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "멀리서 이를 질투 어린 눈으로 보는 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[10화 - 컷 5] 제10화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제10화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 11,
    "title": "제11화: 영숙의 계약 만료 통보",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[11화 - 컷 1] 대행사 팀장의 냉정한 한마디. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "대행사 팀장의 냉정한 한마디. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제11화 《영숙의 계약 만료 통보》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[11화 - 컷 2] 옥상 난간에 기대어 참던 눈물. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "옥상 난간에 기대어 참던 눈물. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[11화 - 컷 3] 말없이 라면을 끓여 내오는 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "말없이 라면을 끓여 내오는 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[11화 - 컷 4] 달빛 아래 나눈 첫 번째 진심. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "달빛 아래 나눈 첫 번째 진심. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[11화 - 컷 5] 제11화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제11화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 12,
    "title": "제12화: 홍식의 새로운 미끼",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[12화 - 컷 1] 고급 양복을 빌려 입은 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "고급 양복을 빌려 입은 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제12화 《홍식의 새로운 미끼》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[12화 - 컷 2] 중년 사모님에게 접근하는 위험한 미소. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "중년 사모님에게 접근하는 위험한 미소. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[12화 - 컷 3] 춘섭의 오토바이 열쇠를 몰래 빼돌리다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "춘섭의 오토바이 열쇠를 몰래 빼돌리다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[12화 - 컷 4] 어긋나기 시작하는 두 친구의 궤도. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "어긋나기 시작하는 두 친구의 궤도. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[12화 - 컷 5] 제12화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제12화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 13,
    "title": "제13화: 고장 난 오토바이와 늦은 밤",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[13화 - 컷 1] 배달 도중 멈춰 선 춘섭의 오토바이. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "배달 도중 멈춰 선 춘섭의 오토바이. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제13화 《고장 난 오토바이와 늦은 밤》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[13화 - 컷 2] 직접 공구를 꺼내 수리하는 손길. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "직접 공구를 꺼내 수리하는 손길. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[13화 - 컷 3] 영숙의 바리스타 마감 시간. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "영숙의 바리스타 마감 시간. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[13화 - 컷 4] 골목 끝에서 마주친 두 사람의 미소. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "골목 끝에서 마주친 두 사람의 미소. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[13화 - 컷 5] 제13화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제13화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 14,
    "title": "제14화: 거짓말의 대가",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[14화 - 컷 1] 홍식의 핸드폰에 찍힌 부재중 전화 30통. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "홍식의 핸드폰에 찍힌 부재중 전화 30통. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제14화 《거짓말의 대가》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[14화 - 컷 2] 투자금 반환을 요구하는 피해자의 고성. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "투자금 반환을 요구하는 피해자의 고성. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[14화 - 컷 3] 춘섭에게 또다시 거짓 변명을 늘어놓다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "춘섭에게 또다시 거짓 변명을 늘어놓다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[14화 - 컷 4] 실망감이 분노로 바뀌는 순간. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "실망감이 분노로 바뀌는 순간. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[14화 - 컷 5] 제14화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제14화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 15,
    "title": "제15화: 옥탑방의 소소한 회식",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[15화 - 컷 1] 삼겹살 불판 위에 피어오른 연기. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "삼겹살 불판 위에 피어오른 연기. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제15화 《옥탑방의 소소한 회식》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[15화 - 컷 2] 잠시나마 웃음이 번진 세 사람. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "잠시나마 웃음이 번진 세 사람. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[15화 - 컷 3] 영숙의 찰나 같은 미소에 넋을 잃은 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "영숙의 찰나 같은 미소에 넋을 잃은 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[15화 - 컷 4] 그 틈을 노리는 홍식의 계산된 눈빛. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "그 틈을 노리는 홍식의 계산된 눈빛. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[15화 - 컷 5] 제15화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제15화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 16,
    "title": "제16화: 강남 한복판의 추격전",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[16화 - 컷 1] 사채업자 수하들에게 쫓기는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "사채업자 수하들에게 쫓기는 홍식. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제16화 《강남 한복판의 추격전》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[16화 - 컷 2] 지하철역 계단을 내달리는 구겨진 구두. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "지하철역 계단을 내달리는 구겨진 구두. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[16화 - 컷 3] 춘섭의 정비소로 피신한 비참한 꼴. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "춘섭의 정비소로 피신한 비참한 꼴. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[16화 - 컷 4] 더 이상 참을 수 없는 춘섭의 경고. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "더 이상 참을 수 없는 춘섭의 경고. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[16화 - 컷 5] 제16화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제16화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 17,
    "title": "제17화: 영숙의 이력서 백 장",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[17화 - 컷 1] 노트북 화면을 채운 불합격 문자. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "노트북 화면을 채운 불합격 문자. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제17화 《영숙의 이력서 백 장》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[17화 - 컷 2] 카페 구석에서 지친 고개를 숙인 영숙. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "카페 구석에서 지친 고개를 숙인 영숙. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[17화 - 컷 3] 조용히 따뜻한 밀크티를 내려놓는 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "조용히 따뜻한 밀크티를 내려놓는 춘섭. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[17화 - 컷 4] 누군가의 존재가 버팀목이 되는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "누군가의 존재가 버팀목이 되는 밤. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[17화 - 컷 5] 제17화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제17화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 18,
    "title": "제18화: 코인 급락의 밤",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[18화 - 컷 1] 새벽 3시, 붉게 물든 차트 폭락. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "새벽 3시, 붉게 물든 차트 폭락. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제18화 《코인 급락의 밤》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[18화 - 컷 2] 옥탑방 바닥에 주저앉아 머리를 감싸 쥔 홍식. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "옥탑방 바닥에 주저앉아 머리를 감싸 쥔 홍식. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[18화 - 컷 3] 춘섭의 전세금 잔여금마저 증발하다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "춘섭의 전세금 잔여금마저 증발하다. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[18화 - 컷 4] 폭풍 전야의 고요한 새벽. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "폭풍 전야의 고요한 새벽. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[18화 - 컷 5] 제18화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제18화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 19,
    "title": "제19화: 주먹과 눈물",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[19화 - 컷 1] 진실을 알게 된 춘섭의 폭발. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "진실을 알게 된 춘섭의 폭발. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제19화 《주먹과 눈물》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[19화 - 컷 2] 옥탑방 마당에서 뒹구는 두 남자. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "옥탑방 마당에서 뒹구는 두 남자. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[19화 - 컷 3] 말리는 영숙 앞에서 터져 나온 춘섭의 설움. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "말리는 영숙 앞에서 터져 나온 춘섭의 설움. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[19화 - 컷 4] 고개를 들지 못하는 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "고개를 들지 못하는 홍식. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[19화 - 컷 5] 제19화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제19화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 20,
    "title": "제20화: 1부 마지막 밤의 결심",
    "part": "1부: 신림동 옥탑방 상경과 밑바닥 생존기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[20화 - 컷 1] 짐을 싸는 듯하다가 다시 내려놓는 춘섭. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "scene": "짐을 싸는 듯하다가 다시 내려놓는 춘섭. 서울의 화려한 불빛과 달동네의 명암이 교차한다.",
        "dialogue": "",
        "narration": "내레이션: 제20화 《1부 마지막 밤의 결심》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[20화 - 컷 2] 이 서울 바닥에서 끝까지 버텨보겠다는 다짐. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "scene": "이 서울 바닥에서 끝까지 버텨보겠다는 다짐. 각자의 현실을 짊어진 채 발걸음을 옮긴다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[20화 - 컷 3] 영숙의 작은 응원 메시지. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "scene": "영숙의 작은 응원 메시지. 예상치 못한 현실의 벽 앞에서 흔들리는 마음.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[20화 - 컷 4] 더 짙어진 강남 야경과 하얀 달. 날카로운 말과 진심이 부딪히는 순간.",
        "scene": "더 짙어진 강남 야경과 하얀 달. 날카로운 말과 진심이 부딪히는 순간.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[20화 - 컷 5] 제20화의 여운이 남는 신림동 옥탑방의 달빛.",
        "scene": "제20화의 여운이 남는 신림동 옥탑방의 달빛.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 21,
    "title": "제21화: 화려한 가면 뒤의 그림자",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[21화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '화려한 가면 뒤의 그림자' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '화려한 가면 뒤의 그림자' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제21화 《화려한 가면 뒤의 그림자》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[21화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[21화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[21화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[21화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 22,
    "title": "제22화: 정비소 야간 특근",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[22화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '정비소 야간 특근' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '정비소 야간 특근' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제22화 《정비소 야간 특근》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[22화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[22화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[22화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[22화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 23,
    "title": "제23화: 강남 사모님의 초대",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[23화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '강남 사모님의 초대' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '강남 사모님의 초대' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제23화 《강남 사모님의 초대》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[23화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[23화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[23화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[23화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 24,
    "title": "제24화: 영숙의 첫 면접",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[24화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '영숙의 첫 면접' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '영숙의 첫 면접' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제24화 《영숙의 첫 면접》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[24화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[24화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[24화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[24화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 25,
    "title": "제25화: 오토바이 엔진 소리",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[25화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '오토바이 엔진 소리' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '오토바이 엔진 소리' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제25화 《오토바이 엔진 소리》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[25화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[25화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[25화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[25화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 26,
    "title": "제26화: 위험한 거래의 시작",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[26화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '위험한 거래의 시작' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '위험한 거래의 시작' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제26화 《위험한 거래의 시작》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[26화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[26화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[26화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[26화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 27,
    "title": "제27화: 옥탑방에 핀 작은 꽃",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[27화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '옥탑방에 핀 작은 꽃' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '옥탑방에 핀 작은 꽃' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제27화 《옥탑방에 핀 작은 꽃》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[27화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[27화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[27화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[27화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 28,
    "title": "제28화: 사채 이자 마감일",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[28화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '사채 이자 마감일' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '사채 이자 마감일' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제28화 《사채 이자 마감일》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[28화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[28화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[28화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[28화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 29,
    "title": "제29화: 춘섭의 비밀 저금통",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[29화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '춘섭의 비밀 저금통' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '춘섭의 비밀 저금통' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제29화 《춘섭의 비밀 저금통》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[29화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[29화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[29화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[29화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 30,
    "title": "제30화: 홍식의 도박수",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[30화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '홍식의 도박수' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '홍식의 도박수' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제30화 《홍식의 도박수》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[30화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[30화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[30화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[30화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 31,
    "title": "제31화: 한강 다리 위에서",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[31화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '한강 다리 위에서' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '한강 다리 위에서' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제31화 《한강 다리 위에서》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[31화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[31화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[31화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[31화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 32,
    "title": "제32화: 계약직의 반란",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[32화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '계약직의 반란' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '계약직의 반란' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제32화 《계약직의 반란》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[32화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[32화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[32화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[32화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 33,
    "title": "제33화: 무너진 신뢰",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[33화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '무너진 신뢰' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '무너진 신뢰' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제33화 《무너진 신뢰》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[33화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[33화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[33화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[33화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 34,
    "title": "제34화: 새로운 정비 기술",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[34화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '새로운 정비 기술' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '새로운 정비 기술' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제34화 《새로운 정비 기술》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[34화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[34화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[34화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[34화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 35,
    "title": "제35화: 달동네 정전 소동",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[35화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '달동네 정전 소동' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '달동네 정전 소동' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제35화 《달동네 정전 소동》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[35화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[35화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[35화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[35화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 36,
    "title": "제36화: 불청객의 방문",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[36화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '불청객의 방문' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '불청객의 방문' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제36화 《불청객의 방문》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[36화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[36화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[36화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[36화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 37,
    "title": "제37화: 영숙의 자취방 구하기",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[37화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '영숙의 자취방 구하기' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '영숙의 자취방 구하기' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제37화 《영숙의 자취방 구하기》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[37화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[37화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[37화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[37화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 38,
    "title": "제38화: 전세 사기 경보",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[38화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '전세 사기 경보' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '전세 사기 경보' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제38화 《전세 사기 경보》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[38화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[38화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[38화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[38화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 39,
    "title": "제39화: 춘섭의 주먹",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[39화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '춘섭의 주먹' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '춘섭의 주먹' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제39화 《춘섭의 주먹》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[39화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[39화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[39화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[39화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 40,
    "title": "제40화: 홍식의 눈물 없는 후회",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[40화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '홍식의 눈물 없는 후회' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '홍식의 눈물 없는 후회' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제40화 《홍식의 눈물 없는 후회》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[40화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[40화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[40화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[40화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 41,
    "title": "제41화: 강남 테헤란로의 비",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[41화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '강남 테헤란로의 비' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '강남 테헤란로의 비' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제41화 《강남 테헤란로의 비》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[41화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[41화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[41화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[41화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 42,
    "title": "제42화: 마지막 기회라는 거짓말",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[42화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '마지막 기회라는 거짓말' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '마지막 기회라는 거짓말' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제42화 《마지막 기회라는 거짓말》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[42화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[42화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[42화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[42화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 43,
    "title": "제43화: 진심 어린 사과",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[43화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '진심 어린 사과' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '진심 어린 사과' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제43화 《진심 어린 사과》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[43화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[43화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[43화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[43화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 44,
    "title": "제44화: 경찰서 앞 새벽",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[44화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '경찰서 앞 새벽' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '경찰서 앞 새벽' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제44화 《경찰서 앞 새벽》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[44화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[44화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[44화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[44화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 45,
    "title": "제45화: 정비소 인수 제안",
    "part": "2부: 강남의 유혹과 엇갈리는 욕망",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[45화 - 컷 1] [2부: 강남의 유혹과 엇갈리는 욕망] '정비소 인수 제안' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[2부: 강남의 유혹과 엇갈리는 욕망] '정비소 인수 제안' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제45화 《정비소 인수 제안》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[45화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[45화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[45화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[45화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 46,
    "title": "제46화: 사라진 2천만 원",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[46화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '사라진 2천만 원' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '사라진 2천만 원' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제46화 《사라진 2천만 원》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[46화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[46화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[46화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[46화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 47,
    "title": "제47화: 마 사장의 최후통첩",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[47화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '마 사장의 최후통첩' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '마 사장의 최후통첩' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제47화 《마 사장의 최후통첩》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[47화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[47화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[47화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[47화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 48,
    "title": "제48화: 영숙의 결단",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[48화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '영숙의 결단' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '영숙의 결단' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제48화 《영숙의 결단》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[48화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[48화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[48화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[48화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 49,
    "title": "제49화: 빗속의 오토바이",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[49화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '빗속의 오토바이' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '빗속의 오토바이' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제49화 《빗속의 오토바이》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[49화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[49화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[49화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[49화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 50,
    "title": "제50화: 무너지는 모래성",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[50화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '무너지는 모래성' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '무너지는 모래성' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제50화 《무너지는 모래성》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[50화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[50화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[50화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[50화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 51,
    "title": "제51화: 형사들의 방문",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[51화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '형사들의 방문' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '형사들의 방문' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제51화 《형사들의 방문》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[51화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[51화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[51화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[51화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 52,
    "title": "제52화: 홍식의 도주",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[52화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '홍식의 도주' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '홍식의 도주' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제52화 《홍식의 도주》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[52화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[52화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[52화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[52화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 53,
    "title": "제53화: 홀로 남은 옥탑방",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[53화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '홀로 남은 옥탑방' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '홀로 남은 옥탑방' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제53화 《홀로 남은 옥탑방》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[53화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[53화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[53화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[53화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 54,
    "title": "제54화: 춘섭의 묵묵한 하루",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[54화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '춘섭의 묵묵한 하루' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '춘섭의 묵묵한 하루' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제54화 《춘섭의 묵묵한 하루》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[54화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[54화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[54화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[54화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 55,
    "title": "제55화: 영숙의 정규직 합격",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[55화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '영숙의 정규직 합격' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '영숙의 정규직 합격' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제55화 《영숙의 정규직 합격》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[55화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[55화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[55화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[55화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 56,
    "title": "제56화: 첫 출근길의 햇살",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[56화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '첫 출근길의 햇살' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '첫 출근길의 햇살' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제56화 《첫 출근길의 햇살》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[56화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[56화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[56화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[56화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 57,
    "title": "제57화: 신림동 골목의 작은 기적",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[57화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '신림동 골목의 작은 기적' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '신림동 골목의 작은 기적' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제57화 《신림동 골목의 작은 기적》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[57화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[57화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[57화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[57화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 58,
    "title": "제58화: 수배 중인 친구",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[58화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '수배 중인 친구' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '수배 중인 친구' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제58화 《수배 중인 친구》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[58화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[58화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[58화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[58화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 59,
    "title": "제59화: 오래된 사진 한 장",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[59화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '오래된 사진 한 장' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '오래된 사진 한 장' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제59화 《오래된 사진 한 장》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[59화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[59화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[59화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[59화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 60,
    "title": "제60화: 어머니의 전화",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[60화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '어머니의 전화' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '어머니의 전화' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제60화 《어머니의 전화》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[60화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[60화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[60화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[60화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 61,
    "title": "제61화: 병원 앞 벤치",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[61화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '병원 앞 벤치' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '병원 앞 벤치' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제61화 《병원 앞 벤치》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[61화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[61화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[61화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[61화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 62,
    "title": "제62화: 춘섭 정비소 개업 준비",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[62화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '춘섭 정비소 개업 준비' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '춘섭 정비소 개업 준비' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제62화 《춘섭 정비소 개업 준비》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[62화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[62화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[62화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[62화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 63,
    "title": "제63화: 낡은 간판의 빛",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[63화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '낡은 간판의 빛' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '낡은 간판의 빛' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제63화 《낡은 간판의 빛》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[63화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[63화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[63화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[63화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 64,
    "title": "제64화: 영숙이 건넨 화분",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[64화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '영숙이 건넨 화분' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '영숙이 건넨 화분' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제64화 《영숙이 건넨 화분》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[64화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[64화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[64화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[64화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 65,
    "title": "제65화: 어느 비 오는 밤의 재회",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[65화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '어느 비 오는 밤의 재회' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '어느 비 오는 밤의 재회' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제65화 《어느 비 오는 밤의 재회》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[65화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[65화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[65화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[65화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 66,
    "title": "제66화: 초라해진 홍식",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[66화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '초라해진 홍식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '초라해진 홍식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제66화 《초라해진 홍식》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[66화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[66화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[66화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[66화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 67,
    "title": "제67화: 마지막 자존심",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[67화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '마지막 자존심' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '마지막 자존심' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제67화 《마지막 자존심》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[67화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[67화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[67화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[67화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 68,
    "title": "제68화: 경찰에 자수하는 날",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[68화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '경찰에 자수하는 날' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '경찰에 자수하는 날' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제68화 《경찰에 자수하는 날》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[68화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[68화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[68화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[68화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 69,
    "title": "제69화: 면회실 유리창 너머",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[69화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '면회실 유리창 너머' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '면회실 유리창 너머' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제69화 《면회실 유리창 너머》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[69화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[69화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[69화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[69화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 70,
    "title": "제70화: 용서와 화해의 악수",
    "part": "3부: 사채의 늪과 다가오는 파국",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[70화 - 컷 1] [3부: 사채의 늪과 다가오는 파국] '용서와 화해의 악수' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[3부: 사채의 늪과 다가오는 파국] '용서와 화해의 악수' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제70화 《용서와 화해의 악수》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[70화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[70화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[70화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[70화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 71,
    "title": "제71화: 강남 불빛의 진짜 의미",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[71화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '강남 불빛의 진짜 의미' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '강남 불빛의 진짜 의미' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제71화 《강남 불빛의 진짜 의미》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[71화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[71화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[71화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[71화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 72,
    "title": "제72화: 옥탑방에서의 마지막 밤",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[72화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '옥탑방에서의 마지막 밤' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '옥탑방에서의 마지막 밤' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제72화 《옥탑방에서의 마지막 밤》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[72화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[72화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[72화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[72화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 73,
    "title": "제73화: 이삿짐을 싸는 손길",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[73화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '이삿짐을 싸는 손길' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '이삿짐을 싸는 손길' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제73화 《이삿짐을 싸는 손길》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[73화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[73화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[73화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[73화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 74,
    "title": "제74화: 골목길 계단의 추억",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[74화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '골목길 계단의 추억' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '골목길 계단의 추억' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제74화 《골목길 계단의 추억》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[74화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[74화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[74화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[74화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 75,
    "title": "제75화: 춘섭 정비소 오픈식",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[75화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '춘섭 정비소 오픈식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '춘섭 정비소 오픈식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제75화 《춘섭 정비소 오픈식》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[75화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[75화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[75화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[75화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 76,
    "title": "제76화: 영숙의 새로운 프로젝트",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[76화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '영숙의 새로운 프로젝트' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '영숙의 새로운 프로젝트' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제76화 《영숙의 새로운 프로젝트》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[76화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[76화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[76화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[76화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 77,
    "title": "제77화: 달빛 아래 프러포즈",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[77화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '달빛 아래 프러포즈' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '달빛 아래 프러포즈' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제77화 《달빛 아래 프러포즈》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[77화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[77화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[77화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[77화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 78,
    "title": "제78화: 출소 후 달라진 홍식",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[78화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '출소 후 달라진 홍식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '출소 후 달라진 홍식' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제78화 《출소 후 달라진 홍식》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[78화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[78화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[78화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[78화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 79,
    "title": "제79화: 작은 배달 가게의 시작",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[79화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '작은 배달 가게의 시작' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '작은 배달 가게의 시작' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제79화 《작은 배달 가게의 시작》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[79화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[79화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[79화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[79화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 80,
    "title": "제80화: 다시 마주 앉은 평상",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[80화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '다시 마주 앉은 평상' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '다시 마주 앉은 평상' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제80화 《다시 마주 앉은 평상》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[80화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[80화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[80화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[80화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 81,
    "title": "제81화: 컵라면과 캔맥주",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[81화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '컵라면과 캔맥주' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '컵라면과 캔맥주' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제81화 《컵라면과 캔맥주》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[81화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[81화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[81화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[81화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 82,
    "title": "제82화: 서울 하늘의 둥근 달",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[82화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '서울 하늘의 둥근 달' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '서울 하늘의 둥근 달' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제82화 《서울 하늘의 둥근 달》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[82화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[82화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[82화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[82화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 83,
    "title": "제83화: 각자의 자리에서",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[83화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '각자의 자리에서' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '각자의 자리에서' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제83화 《각자의 자리에서》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[83화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[83화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[83화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[83화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 84,
    "title": "제84화: 흔들려도 꺼지지 않는 불빛",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[84화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '흔들려도 꺼지지 않는 불빛' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '흔들려도 꺼지지 않는 불빛' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제84화 《흔들려도 꺼지지 않는 불빛》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[84화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[84화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[84화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[84화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 85,
    "title": "제85화: 어제의 적에서 오늘의 동료로",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[85화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '어제의 적에서 오늘의 동료로' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '어제의 적에서 오늘의 동료로' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제85화 《어제의 적에서 오늘의 동료로》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[85화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[85화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[85화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[85화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 86,
    "title": "제86화: 겨울을 지나 봄으로",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[86화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '겨울을 지나 봄으로' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '겨울을 지나 봄으로' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제86화 《겨울을 지나 봄으로》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[86화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[86화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[86화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[86화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 87,
    "title": "제87화: 신림동 언덕의 바람",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[87화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '신림동 언덕의 바람' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '신림동 언덕의 바람' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제87화 《신림동 언덕의 바람》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[87화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[87화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[87화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[87화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 88,
    "title": "제88화: 청춘의 값진 흉터",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[88화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '청춘의 값진 흉터' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '청춘의 값진 흉터' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제88화 《청춘의 값진 흉터》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[88화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[88화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[88화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[88화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 89,
    "title": "제89화: 내일을 향한 시동",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[89화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '내일을 향한 시동' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '내일을 향한 시동' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제89화 《내일을 향한 시동》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[89화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[89화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[89화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[89화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 90,
    "title": "제90화: 10년 후의 서울",
    "part": "4부: 빗속의 진심과 홀로서기",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[90화 - 컷 1] [4부: 빗속의 진심과 홀로서기] '10년 후의 서울' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[4부: 빗속의 진심과 홀로서기] '10년 후의 서울' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제90화 《10년 후의 서울》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[90화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[90화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[90화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[90화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 91,
    "title": "제91화: 강남 빌딩을 바라보며",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[91화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '강남 빌딩을 바라보며' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '강남 빌딩을 바라보며' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제91화 《강남 빌딩을 바라보며》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[91화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[91화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[91화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[91화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 92,
    "title": "제92화: 우리만의 작은 보금자리",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[92화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '우리만의 작은 보금자리' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '우리만의 작은 보금자리' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제92화 《우리만의 작은 보금자리》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[92화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[92화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[92화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[92화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 93,
    "title": "제93화: 달이 비추는 옥탑방",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[93화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '달이 비추는 옥탑방' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '달이 비추는 옥탑방' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제93화 《달이 비추는 옥탑방》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[93화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[93화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[93화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[93화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 94,
    "title": "제94화: 변하지 않는 진심",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[94화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '변하지 않는 진심' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '변하지 않는 진심' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제94화 《변하지 않는 진심》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[94화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[94화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[94화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[94화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 95,
    "title": "제95화: 가장 빛나는 순간",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[95화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '가장 빛나는 순간' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '가장 빛나는 순간' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제95화 《가장 빛나는 순간》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[95화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[95화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[95화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[95화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 96,
    "title": "제96화: 고향에서 온 소포",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[96화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '고향에서 온 소포' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '고향에서 온 소포' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제96화 《고향에서 온 소포》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[96화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[96화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[96화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[96화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 97,
    "title": "제97화: 새로운 신입 정비사",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq1-ambition.jpg",
        "showImage": true,
        "caption": "[97화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '새로운 신입 정비사' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '새로운 신입 정비사' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제97화 《새로운 신입 정비사》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[97화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[97화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[97화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[97화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 98,
    "title": "제98화: 영숙의 작은 카페 꿈",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-station.jpg",
        "showImage": true,
        "caption": "[98화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '영숙의 작은 카페 꿈' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '영숙의 작은 카페 꿈' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제98화 《영숙의 작은 카페 꿈》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[98화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[98화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[98화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[98화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 99,
    "title": "제99화: 홍식의 정직한 땀",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/ep1-seq2-debt.jpg",
        "showImage": true,
        "caption": "[99화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '홍식의 정직한 땀' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '홍식의 정직한 땀' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제99화 《홍식의 정직한 땀》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[99화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[99화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[99화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[99화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  },
  {
    "epNumber": 100,
    "title": "제100화: 옥탑방에서 바라본 진짜 달",
    "part": "5부: 옥탑방에서 바라본 진짜 달 (완결)",
    "isFree": false,
    "cuts": [
      {
        "num": 1,
        "shot": "익스트림 롱샷 / 밤",
        "img": "/images/cut-rooftop.jpg",
        "showImage": true,
        "caption": "[100화 - 컷 1] [5부: 옥탑방에서 바라본 진짜 달 (완결)] '옥탑방에서 바라본 진짜 달' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "scene": "[5부: 옥탑방에서 바라본 진짜 달 (완결)] '옥탑방에서 바라본 진짜 달' — 밤늦은 신림동 옥탑방과 강남의 불빛이 대비된다.",
        "dialogue": "",
        "narration": "내레이션: 제100화 《옥탑방에서 바라본 진짜 달》 — 서울의 밤은 누구에게나 공평하게 차갑다.",
        "sfx": ""
      },
      {
        "num": 2,
        "shot": "미디엄 샷 / 낮",
        "img": "/images/ep1-seq4-ramen.jpg",
        "showImage": true,
        "caption": "[100화 - 컷 2] 춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "scene": "춘섭은 묵묵히 자신의 일을 해내며 현실의 벽을 정면으로 돌파한다.",
        "dialogue": "춘섭: 하루하루 정직하게 버티다 보면 언젠간 내 자리도 생기겠지.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 3,
        "shot": "클로즈업 / 인물",
        "img": "/images/cut-alley.jpg",
        "showImage": true,
        "caption": "[100화 - 컷 3] 홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "scene": "홍식은 욕망과 현실 사이에서 위태로운 선택의 기로에 선다.",
        "dialogue": "홍식: 아직 끝난 게 아니야. 판을 뒤집을 한 방이 남아있어.",
        "narration": "",
        "sfx": ""
      },
      {
        "num": 4,
        "shot": "로우앵글 / 대립",
        "img": "/images/poster-seoul-moon.jpg",
        "showImage": true,
        "caption": "[100화 - 컷 4] 영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "scene": "영숙은 흔들리지 않는 눈빛으로 자신의 자리와 진심을 지켜낸다.",
        "dialogue": "영숙: 도망치지 말고 지금 눈앞에 있는 현실부터 똑바로 봐요.",
        "narration": "",
        "sfx": "두근... 두근..."
      },
      {
        "num": 5,
        "shot": "버스트 샷 / 여운",
        "img": "/images/ep1-seq1-opening.jpg",
        "showImage": true,
        "caption": "[100화 - 컷 5] 달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "scene": "달빛 아래 세 청춘의 이야기가 다음 장으로 이어진다.",
        "dialogue": "",
        "narration": "춘섭(속마음): 흔들리긴 해도 무너지진 않는다. 오늘도 달은 떠 있으니까.",
        "sfx": "우웅- 바람 소리"
      }
    ]
  }
];
