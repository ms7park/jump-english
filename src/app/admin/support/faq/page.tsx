export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { FaqManager } from "@/components/admin/faq-manager";

export default async function AdminFaqPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return <FaqManager initialFaqs={data ?? []} />;
}
