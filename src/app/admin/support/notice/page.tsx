export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { NoticeManager } from "@/components/admin/notice-manager";

export default async function AdminNoticePage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("notices")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  return <NoticeManager initialNotices={data ?? []} />;
}
