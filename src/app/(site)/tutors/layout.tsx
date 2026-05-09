import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "강사 소개",
  description: "Jump English의 검증된 원어민 강사진을 소개합니다. 미국, 영국, 캐나다, 호주 출신 강사 50명+.",
});

export default function TutorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
