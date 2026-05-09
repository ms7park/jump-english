export type ConsultStatus = "대기" | "확인" | "완료";

export type Consult = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  contactTime: string;
  message: string;
  status: ConsultStatus;
  createdAt: string;
};

export const consults: Consult[] = [
  {
    id: "1",
    name: "김영수",
    phone: "01012345678",
    email: "ys.kim@example.com",
    course: "비즈니스 과정",
    contactTime: "오전 (10시~12시)",
    message: "현재 업무상 해외 미팅이 잦아서 비즈니스 영어를 빠르게 향상시키고 싶습니다.",
    status: "대기",
    createdAt: "2026-05-09",
  },
  {
    id: "2",
    name: "이지혜",
    phone: "01098765432",
    email: "jihye.lee@example.com",
    course: "무료 레벨 테스트만",
    contactTime: "오후 (12시~15시)",
    message: "",
    status: "확인",
    createdAt: "2026-05-08",
  },
  {
    id: "3",
    name: "박민준",
    phone: "01055556666",
    email: "minjun.park@example.com",
    course: "중급 과정",
    contactTime: "아무 때나 가능",
    message: "영어 회화를 2년 넘게 공부했는데 실력이 늘지 않아 고민입니다.",
    status: "완료",
    createdAt: "2026-05-07",
  },
  {
    id: "4",
    name: "최수빈",
    phone: "01077778888",
    email: "subin.choi@example.com",
    course: "기초 과정",
    contactTime: "오후 늦게 (15시~18시)",
    message: "영어를 처음 시작하는데 어떤 과정이 적합한지 상담받고 싶습니다.",
    status: "대기",
    createdAt: "2026-05-07",
  },
  {
    id: "5",
    name: "정태양",
    phone: "01022223333",
    email: "taeyang.jung@example.com",
    course: "고급 과정",
    contactTime: "오전 (10시~12시)",
    message: "IELTS 7.5 이상을 목표로 하고 있습니다. 준비 기간과 방법에 대해 상담받고 싶습니다.",
    status: "확인",
    createdAt: "2026-05-06",
  },
];
