export const dynamic = "force-dynamic";

import Link from "next/link";
import { createPublicClient } from "@/lib/supabase";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { TutorsList } from "@/components/site/tutors-list";

export default async function TutorsPage() {
  const supabase = createPublicClient();
  const { data: tutors } = await supabase
    .from("tutors")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="강사 소개"
            description="엄선된 원어민 강사진을 만나보세요. 모든 강사는 TESOL/TEFL 자격증 보유 또는 5년+ 경력자입니다."
          />
        </Container>
      </section>
      <TutorsList tutors={tutors ?? []} />
      <section className="bg-muted/40 py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold">어떤 강사가 나에게 맞을까요?</h2>
            <p className="max-w-md text-muted-foreground">무료 레벨 테스트 후 목표와 스타일에 맞는 강사를 추천해 드립니다.</p>
            <Link href="/support/consult" className={buttonVariants({ size: "lg" })}>무료 강사 매칭 받기</Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
