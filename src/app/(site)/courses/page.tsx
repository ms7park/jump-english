export const dynamic = "force-dynamic";

import Link from "next/link";
import { createPublicClient } from "@/lib/supabase";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { CoursesList } from "@/components/site/courses-list";

export default async function CoursesPage() {
  const supabase = createPublicClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="수강 과정 & 가격"
            description="목표와 수준에 맞는 과정을 선택하세요. 모든 과정은 1:1 맞춤 수업으로 진행됩니다."
          />
        </Container>
      </section>
      <CoursesList courses={courses ?? []} />
      <section className="bg-muted/40 py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-xl font-bold">어떤 과정이 맞을지 모르겠다면?</h2>
            <p className="text-muted-foreground">무료 레벨 테스트를 통해 딱 맞는 과정을 추천해 드립니다.</p>
            <Link href="/support/consult" className={buttonVariants({ size: "lg" })}>무료 레벨 테스트 신청 →</Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
