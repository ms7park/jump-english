import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "1:1 상담 신청",
  description: "Jump English 1:1 상담 신청. 무료 레벨 테스트 신청도 이 폼을 이용해 주세요.",
});

export default function ConsultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
