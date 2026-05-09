export const dynamic = "force-dynamic";

import { createPublicClient } from "@/lib/supabase";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { FaqList } from "@/components/site/faq-list";

export default async function FaqPage() {
  const supabase = createPublicClient();
  const { data: faqs } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="자주 묻는 질문"
            description="궁금한 점이 있으신가요? 아래에서 빠르게 찾아보세요."
          />
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          <FaqList faqs={faqs ?? []} />
        </Container>
      </section>
    </div>
  );
}
