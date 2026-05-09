export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { ConsultManager } from "@/components/admin/consult-manager";

export default async function AdminConsultPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("consults")
    .select("*")
    .order("created_at", { ascending: false });

  return <ConsultManager initialConsults={data ?? []} />;
}
