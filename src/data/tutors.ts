export type Tutor = {
  id: string;
  name: string;
  nationality: string;
  nationalityFlag: string;
  major: string;
  experience: number;
  styles: string[];
  bio: string;
  initials: string;
};

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    nationality: "미국",
    nationalityFlag: "🇺🇸",
    major: "영어교육학",
    experience: 8,
    styles: ["비즈니스", "프레젠테이션", "면접"],
    bio: "뉴욕 출신의 영어교육 전문가. 비즈니스 영어와 프레젠테이션 스킬에 특화되어 있으며, 다양한 기업 임직원 대상 강의 경험이 풍부합니다.",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Michael Brown",
    nationality: "미국",
    nationalityFlag: "🇺🇸",
    major: "언어학",
    experience: 6,
    styles: ["일상회화", "여행", "발음교정"],
    bio: "캘리포니아 출신. 자연스러운 일상 영어 표현과 발음 교정에 강점이 있습니다. 초보자도 부담 없이 시작할 수 있도록 편안한 수업 분위기를 만들어 드립니다.",
    initials: "MB",
  },
  {
    id: "3",
    name: "Emily Davis",
    nationality: "영국",
    nationalityFlag: "🇬🇧",
    major: "TESOL",
    experience: 10,
    styles: ["영국식영어", "아이엘츠", "학문적글쓰기"],
    bio: "런던 출신의 TESOL 자격증 보유 강사. IELTS 준비부터 학문적 영어까지 체계적인 커리큘럼으로 수업을 진행합니다.",
    initials: "ED",
  },
  {
    id: "4",
    name: "James Wilson",
    nationality: "캐나다",
    nationalityFlag: "🇨🇦",
    major: "커뮤니케이션학",
    experience: 5,
    styles: ["토론", "비즈니스", "뉴스영어"],
    bio: "토론토 출신의 활발한 강사. 시사 토론과 뉴스 기반 수업으로 실용적인 영어 표현력을 기릅니다.",
    initials: "JW",
  },
  {
    id: "5",
    name: "Olivia Taylor",
    nationality: "호주",
    nationalityFlag: "🇦🇺",
    major: "영어교육학",
    experience: 7,
    styles: ["여행", "일상회화", "문화교류"],
    bio: "시드니 출신. 호주 특유의 친근한 분위기로 수업을 진행하며, 여행 영어와 일상 표현 습득에 특화되어 있습니다.",
    initials: "OT",
  },
  {
    id: "6",
    name: "Robert Martinez",
    nationality: "미국",
    nationalityFlag: "🇺🇸",
    major: "경영학",
    experience: 9,
    styles: ["비즈니스", "협상", "이메일작성"],
    bio: "시카고 출신 MBA 졸업생. 실무 비즈니스 영어, 협상 기술, 비즈니스 이메일 작성법을 전문적으로 가르칩니다.",
    initials: "RM",
  },
];
