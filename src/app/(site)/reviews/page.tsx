export const dynamic = "force-dynamic";

import { createPublicClient } from "@/lib/supabase";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ReviewsList } from "@/components/site/reviews-list";

export default async function ReviewsPage() {
  const supabase = createPublicClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="수강 후기"
            description="실제 수강생들이 직접 남긴 솔직한 후기입니다."
          />
        </Container>
      </section>
      <ReviewsList reviews={reviews ?? []} />
    </div>
  );
}
