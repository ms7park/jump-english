import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "자주 묻는 질문",
  description: "Jump English FAQ. 수업, 결제, 기술 지원에 관한 자주 묻는 질문을 확인하세요.",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
