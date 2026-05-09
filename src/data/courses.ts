export type Course = {
  id: string;
  category: "기초" | "중급" | "고급" | "비즈니스";
  name: string;
  target: string;
  duration: string;
  sessionsPerWeek: number;
  price: number;
  features: string[];
  badge?: "인기" | "신규" | "추천";
};

export const courses: Course[] = [
  {
    id: "basic-1",
    category: "기초",
    name: "영어 첫걸음",
    target: "영어를 처음 시작하거나 오랫동안 손 놓았던 분",
    duration: "3개월",
    sessionsPerWeek: 3,
    price: 89000,
    features: [
      "알파벳부터 기초 회화까지",
      "원어민 강사와 1:1 맞춤 수업",
      "매 수업 피드백 제공",
      "무료 레벨 테스트 포함",
      "수업 녹화 파일 제공",
    ],
    badge: "추천",
  },
  {
    id: "basic-2",
    category: "기초",
    name: "생존 영어",
    target: "해외여행, 짧은 출장을 앞둔 분",
    duration: "1개월",
    sessionsPerWeek: 2,
    price: 59000,
    features: [
      "공항, 호텔, 식당 실전 표현",
      "상황별 롤플레이 집중 훈련",
      "핵심 표현 200문장 제공",
      "수업 녹화 파일 제공",
    ],
  },
  {
    id: "intermediate-1",
    category: "중급",
    name: "자유 회화",
    target: "기초 문법은 알지만 말이 안 나오는 분",
    duration: "3개월",
    sessionsPerWeek: 3,
    price: 109000,
    features: [
      "다양한 주제로 자유 토론",
      "발음 & 억양 교정",
      "주간 학습 리포트 제공",
      "원어민 강사 선택 가능",
      "수업 녹화 파일 제공",
    ],
    badge: "인기",
  },
  {
    id: "intermediate-2",
    category: "중급",
    name: "뉴스 영어",
    target: "영어 뉴스를 읽고 토론하고 싶은 분",
    duration: "2개월",
    sessionsPerWeek: 2,
    price: 89000,
    features: [
      "BBC, CNN 기사 기반 수업",
      "시사 영어 어휘 확장",
      "의견 표현 & 토론 훈련",
      "수업 녹화 파일 제공",
    ],
  },
  {
    id: "advanced-1",
    category: "고급",
    name: "고급 회화",
    target: "유창함을 원하는 중고급 이상 수준의 분",
    duration: "3개월",
    sessionsPerWeek: 3,
    price: 129000,
    features: [
      "원어민 수준 표현 & 뉘앙스 훈련",
      "고급 어휘 및 관용표현",
      "주제별 심층 토론",
      "1:1 맞춤 피드백",
      "수업 녹화 파일 제공",
    ],
  },
  {
    id: "advanced-2",
    category: "고급",
    name: "IELTS / TOEFL 준비",
    target: "영어 공인 시험 고득점을 목표로 하는 분",
    duration: "3개월",
    sessionsPerWeek: 4,
    price: 149000,
    features: [
      "시험 유형 분석 및 전략 수립",
      "Speaking & Writing 집중 훈련",
      "모의 시험 제공",
      "1:1 맞춤 피드백",
      "수업 녹화 파일 제공",
    ],
    badge: "신규",
  },
  {
    id: "biz-1",
    category: "비즈니스",
    name: "비즈니스 영어 기초",
    target: "영어로 업무를 시작해야 하는 직장인",
    duration: "2개월",
    sessionsPerWeek: 2,
    price: 109000,
    features: [
      "비즈니스 이메일 작성법",
      "회의 & 전화 영어",
      "프레젠테이션 기초",
      "수업 녹화 파일 제공",
    ],
    badge: "인기",
  },
  {
    id: "biz-2",
    category: "비즈니스",
    name: "협상 & 프레젠테이션",
    target: "글로벌 업무 성과를 높이고 싶은 중고급 직장인",
    duration: "3개월",
    sessionsPerWeek: 3,
    price: 139000,
    features: [
      "비즈니스 협상 전략 & 표현",
      "임팩트 있는 PT 구성법",
      "롤플레이 집중 훈련",
      "1:1 맞춤 피드백",
      "수업 녹화 파일 제공",
    ],
  },
];

export const categories = ["기초", "중급", "고급", "비즈니스"] as const;
