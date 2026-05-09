import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** 공개 읽기용 (RLS 적용, 브라우저/서버 모두 사용 가능) */
export function createPublicClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/** 관리자 전용 (서버 사이드 전용, RLS 우회) */
export function createAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });
}

// ─── DB Types ─────────────────────────────────────────────────────────────────

export type DbTutor = {
  id: string;
  name: string;
  nationality: string;
  nationality_flag: string;
  major: string;
  experience: number;
  styles: string[];
  bio: string;
  initials: string;
  image_url: string | null;
  created_at: string;
};

export type DbCourse = {
  id: string;
  name: string;
  category: "기초" | "중급" | "고급" | "비즈니스";
  target: string;
  duration: string;
  sessions_per_week: number;
  price: number;
  features: string[];
  badge: "인기" | "신규" | "추천" | null;
  sort_order: number;
  created_at: string;
};

export type DbReview = {
  id: string;
  name: string;
  course: string;
  duration: string;
  rating: number;
  content: string;
  initials: string;
  created_at: string;
};

export type DbFaq = {
  id: string;
  category: "수업" | "결제" | "기술" | "기타";
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
};

export type DbNotice = {
  id: string;
  title: string;
  date: string;
  category: "공지" | "이벤트" | "업데이트";
  content: string;
  important: boolean;
  created_at: string;
};

export type DbAdminUser = {
  id: string;
  username: string;
  password_hash: string;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type DbConsult = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  contact_time: string;
  message: string | null;
  status: "대기" | "확인" | "완료";
  created_at: string;
};
