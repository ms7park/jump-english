export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { ReviewsManager } from "@/components/admin/reviews-manager";

export default async function AdminReviewsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  return <ReviewsManager initialReviews={data ?? []} />;
}
