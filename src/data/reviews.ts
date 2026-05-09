export type Review = {
  id: string;
  name: string;
  course: string;
  duration: string;
  rating: number;
  content: string;
  initials: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "김지*",
    course: "비즈니스 영어 기초",
    duration: "2개월 수강",
    rating: 5,
    content:
      "회의 때 한 마디도 못 하던 제가 이제는 외국 바이어와 직접 소통합니다. 강사님이 제 업종에 맞는 표현을 콕콕 짚어주셔서 실무에 바로 적용할 수 있었어요.",
    initials: "김",
  },
  {
    id: "2",
    name: "이민*",
    course: "자유 회화",
    duration: "3개월 수강",
    rating: 5,
    content:
      "문법은 어느 정도 아는데 말이 안 나왔거든요. 3개월 수강하고 나서 영어로 말하는 게 두렵지 않아졌어요. 강사님이 틀려도 괜찮다고 항상 격려해 주셔서 좋았습니다.",
    initials: "이",
  },
  {
    id: "3",
    name: "박성*",
    course: "고급 회화",
    duration: "3개월 수강",
    rating: 5,
    content:
      "원어민 특유의 뉘앙스와 관용 표현들을 배울 수 있어서 정말 좋았습니다. 교과서 영어에서 벗어나 자연스러운 영어를 구사하게 됐어요.",
    initials: "박",
  },
  {
    id: "4",
    name: "최혜*",
    course: "영어 첫걸음",
    duration: "3개월 수강",
    rating: 5,
    content:
      "30대에 영어를 다시 시작하려니 막막했는데, 강사님이 정말 친절하게 처음부터 차근차근 알려주셨어요. 이제 간단한 일상 대화는 자신 있게 할 수 있어요!",
    initials: "최",
  },
  {
    id: "5",
    name: "정우*",
    course: "협상 & 프레젠테이션",
    duration: "3개월 수강",
    rating: 5,
    content:
      "해외 출장에서 프레젠테이션을 해야 했는데, 덕분에 성공적으로 마쳤습니다. 롤플레이 위주의 수업이 실전에서 정말 큰 도움이 됐어요.",
    initials: "정",
  },
  {
    id: "6",
    name: "한수*",
    course: "IELTS / TOEFL 준비",
    duration: "3개월 수강",
    rating: 4,
    content:
      "IELTS Speaking 5.5에서 7.0으로 올렸습니다. 전략적인 접근법과 꼼꼼한 피드백 덕분에 단기간에 큰 점수 향상을 이뤘어요.",
    initials: "한",
  },
  {
    id: "7",
    name: "오지*",
    course: "생존 영어",
    duration: "1개월 수강",
    rating: 5,
    content:
      "유럽 여행 전에 1개월 집중 수강했는데, 실제로 여행 중에 외국인들과 불편 없이 소통했어요! 상황별 표현을 많이 연습해서 자신감이 붙었습니다.",
    initials: "오",
  },
  {
    id: "8",
    name: "윤미*",
    course: "자유 회화",
    duration: "6개월 수강",
    rating: 5,
    content:
      "처음엔 짧게 시작했다가 재등록해서 6개월이 됐네요. 강사님도 제 발전을 함께 기뻐해 주시고, 매 수업이 즐거워요. 적극 추천합니다!",
    initials: "윤",
  },
  {
    id: "9",
    name: "임도*",
    course: "뉴스 영어",
    duration: "2개월 수강",
    rating: 4,
    content:
      "영어 뉴스를 듣고 싶었는데, CNN이나 BBC 기사를 강사님과 함께 읽고 토론하니까 어휘도 늘고 시사 상식도 쌓여서 일석이조였어요.",
    initials: "임",
  },
];
