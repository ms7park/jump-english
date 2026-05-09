import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "수강 후기",
  description: "Jump English 실제 수강생들의 솔직한 후기입니다. 평균 별점 4.9, 재등록률 82%.",
});

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
