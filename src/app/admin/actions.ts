"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase";

// ─── Tutors ───────────────────────────────────────────────────────────────────

export async function createTutor(data: {
  name: string;
  nationality: string;
  nationality_flag: string;
  major: string;
  experience: number;
  styles: string[];
  bio: string;
  image_url?: string | null;
}) {
  const supabase = createAdminClient();
  const initials = data.name.slice(0, 2).toUpperCase();
  const { error } = await supabase.from("tutors").insert({ ...data, initials });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tutors");
  revalidatePath("/tutors");
  revalidatePath("/");
}

export async function updateTutor(
  id: string,
  data: {
    name: string;
    nationality: string;
    nationality_flag: string;
    major: string;
    experience: number;
    styles: string[];
    bio: string;
    image_url?: string | null;
  }
) {
  const supabase = createAdminClient();
  const initials = data.name.slice(0, 2).toUpperCase();
  const { error } = await supabase.from("tutors").update({ ...data, initials }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tutors");
  revalidatePath("/tutors");
  revalidatePath("/");
}

export async function deleteTutor(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("tutors").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tutors");
  revalidatePath("/tutors");
  revalidatePath("/");
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function createCourse(data: {
  name: string;
  category: string;
  target: string;
  duration: string;
  sessions_per_week: number;
  price: number;
  features: string[];
  badge?: string | null;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("courses").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath("/");
}

export async function updateCourse(
  id: string,
  data: {
    name: string;
    category: string;
    target: string;
    duration: string;
    sessions_per_week: number;
    price: number;
    features: string[];
    badge?: string | null;
  }
) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("courses").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath("/");
}

export async function deleteCourse(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath("/");
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function createReview(data: {
  name: string;
  course: string;
  duration: string;
  rating: number;
  content: string;
}) {
  const supabase = createAdminClient();
  const initials = data.name.slice(0, 2).toUpperCase();
  const { error } = await supabase.from("reviews").insert({ ...data, initials });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function deleteReview(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export async function createFaq(data: {
  category: string;
  question: string;
  answer: string;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("faq").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/faq");
  revalidatePath("/support/faq");
}

export async function updateFaq(
  id: string,
  data: { category: string; question: string; answer: string }
) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("faq").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/faq");
  revalidatePath("/support/faq");
}

export async function deleteFaq(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("faq").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/faq");
  revalidatePath("/support/faq");
}

// ─── Notices ──────────────────────────────────────────────────────────────────

export async function createNotice(data: {
  title: string;
  category: string;
  date: string;
  content: string;
  important: boolean;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("notices").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/notice");
  revalidatePath("/support/notice");
}

export async function updateNotice(
  id: string,
  data: {
    title: string;
    category: string;
    date: string;
    content: string;
    important: boolean;
  }
) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("notices").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/notice");
  revalidatePath("/support/notice");
}

export async function deleteNotice(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/notice");
  revalidatePath("/support/notice");
}

// ─── Consults ─────────────────────────────────────────────────────────────────

export async function updateConsultStatus(id: string, status: "대기" | "확인" | "완료") {
  const supabase = createAdminClient();
  const { error } = await supabase.from("consults").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/consult");
}

export async function deleteConsult(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("consults").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/support/consult");
}
