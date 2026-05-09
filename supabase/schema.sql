-- ============================================================
-- Jump English — Supabase Schema
-- Supabase SQL Editor에서 실행하세요.
-- ============================================================

-- 강사
create table if not exists tutors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  nationality text not null,
  nationality_flag text not null default '🇺🇸',
  major text not null,
  experience int not null default 1,
  styles text[] not null default '{}',
  bio text not null default '',
  initials text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 수강 과정
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('기초', '중급', '고급', '비즈니스')),
  target text not null default '',
  duration text not null default '',
  sessions_per_week int not null default 3,
  price int not null default 0,
  features text[] not null default '{}',
  badge text check (badge in ('인기', '신규', '추천')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 수강 후기
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course text not null,
  duration text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  content text not null default '',
  initials text not null,
  created_at timestamptz not null default now()
);

-- FAQ
create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('수업', '결제', '기술', '기타')),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 공지사항
create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null default current_date,
  category text not null check (category in ('공지', '이벤트', '업데이트')),
  content text not null default '',
  important boolean not null default false,
  created_at timestamptz not null default now()
);

-- 1:1 상담 신청
create table if not exists consults (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  course text not null,
  contact_time text not null,
  message text,
  status text not null default '대기' check (status in ('대기', '확인', '완료')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table tutors enable row level security;
alter table courses enable row level security;
alter table reviews enable row level security;
alter table faq enable row level security;
alter table notices enable row level security;
alter table consults enable row level security;

-- 공개 읽기 (anon)
create policy "public read tutors"   on tutors   for select using (true);
create policy "public read courses"  on courses  for select using (true);
create policy "public read reviews"  on reviews  for select using (true);
create policy "public read faq"      on faq      for select using (true);
create policy "public read notices"  on notices  for select using (true);

-- 상담 신청은 누구나 삽입 가능
create policy "public insert consults" on consults for insert with check (true);

-- service_role은 RLS 우회 (별도 정책 불필요)
