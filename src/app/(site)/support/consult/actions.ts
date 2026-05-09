"use server";

import { createPublicClient } from "@/lib/supabase";

export async function submitConsult(data: {
  name: string;
  phone: string;
  email: string;
  course: string;
  contactTime: string;
  message?: string;
}) {
  const supabase = createPublicClient();
  const { error } = await supabase.from("consults").insert({
    name: data.name,
    phone: data.phone,
    email: data.email,
    course: data.course,
    contact_time: data.contactTime,
    message: data.message ?? null,
    status: "대기",
  });
  if (error) throw new Error(error.message);
}
