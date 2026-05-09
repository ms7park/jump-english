export const dynamic = "force-dynamic";

import { createAdminClient } from "@/lib/supabase";
import { CoursesManager } from "@/components/admin/courses-manager";

export default async function AdminCoursesPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return <CoursesManager initialCourses={data ?? []} />;
}
