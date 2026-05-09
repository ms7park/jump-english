export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { TutorsManager } from "@/components/admin/tutors-manager";

export default async function AdminTutorsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tutors")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return <TutorsManager initialTutors={data ?? []} />;
}
