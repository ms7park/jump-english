import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "수강 과정 & 가격",
  description: "Jump English 수강 과정을 소개합니다. 기초부터 비즈니스 영어까지 목표에 맞는 과정을 선택하세요.",
});

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
