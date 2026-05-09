# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js 16 Breaking Changes

This project uses **Next.js 16.2.4**, which has breaking changes from prior versions. Before writing any Next.js code, **read the relevant guide** in `node_modules/next/dist/docs/` — APIs, conventions, and file structure may differ from your training data. Heed deprecation notices.

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, ESLint 9)
- `npm start` — Start production server

## Architecture

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **React Compiler**: Enabled (`reactCompiler: true` in `next.config.ts`) — auto-memoizes components; avoid manual `useMemo`/`useCallback`/`React.memo`
- **Styling**: Tailwind CSS v4 (CSS-first config via `src/app/globals.css`, no `tailwind.config` file)
- **UI Components**: shadcn/ui v4 (radix-nova style). Add components via `npx shadcn@latest add <component>`
- **Icons**: lucide-react
- **Fonts**: Geist Sans + Geist Mono via `next/font/google`
- **Dark mode**: next-themes with `attribute="class"`, system default
- **Forms**: react-hook-form + @hookform/resolvers + zod v4
- **Hooks**: usehooks-ts (useMediaQuery, useLocalStorage, etc.)
- **Password hashing**: bcryptjs (pure JS, works in all Next.js environments)
- **Path alias**: `@/*` maps to `./src/*`

## Project: Jump English 화상영어 홍보 홈페이지

브랜드 컬러: 블루 (`oklch(0.546 0.245 262.881)`)

### Route Group 구조

```
src/app/
  layout.tsx              — 루트 레이아웃 (fonts, ThemeProvider, Toaster만. Header/Footer 없음)
  not-found.tsx
  proxy.ts                — 관리자 인증 미들웨어 (Next.js 16: middleware.ts 대신 proxy.ts 사용)
  (site)/
    layout.tsx            — 사이트 레이아웃 (Header, main, Footer)
    page.tsx              — / 홈페이지
    about/page.tsx
    tutors/page.tsx + layout.tsx
    courses/page.tsx + layout.tsx
    reviews/page.tsx + layout.tsx
    support/page.tsx
    support/faq/page.tsx + layout.tsx
    support/notice/page.tsx
    support/consult/page.tsx + layout.tsx
    error.tsx
    loading.tsx
  admin/
    layout.tsx            — 관리자 레이아웃 (사이드바, 풀스크린. Header/Footer 없음)
    login/page.tsx + actions.ts
    page.tsx              — /admin 대시보드 (Supabase에서 실시간 통계)
    tutors/page.tsx
    courses/page.tsx
    reviews/page.tsx
    support/faq/page.tsx
    support/notice/page.tsx
    support/consult/page.tsx
```

### 동적 데이터 (Supabase)

모든 사이트 페이지와 관리자 페이지는 Supabase에서 데이터를 실시간 조회한다.
`src/data/` 정적 파일은 레거시로 남아있으나 현재 사용되지 않는다.

#### Supabase 클라이언트

- `createPublicClient()` — anon key, RLS 적용. 사이트 페이지 및 상담 신청 폼에 사용
- `createAdminClient()` — service role key, RLS 우회. 관리자 페이지 및 Server Actions에서만 사용 (서버 사이드 전용)

#### DB 테이블 및 타입 (`src/lib/supabase.ts`)

| 테이블 | 타입 | 비고 |
|---|---|---|
| `tutors` | `DbTutor` | 강사. `image_url`은 Cloudinary URL |
| `courses` | `DbCourse` | 수강 과정. `badge`: "인기"\|"신규"\|"추천"\|null |
| `reviews` | `DbReview` | 수강 후기. `initials`는 서버 액션에서 자동 생성 |
| `faq` | `DbFaq` | 카테고리: 수업\|결제\|기술\|기타 |
| `notices` | `DbNotice` | 카테고리: 공지\|이벤트\|업데이트 |
| `consults` | `DbConsult` | 상담 신청. status: 대기\|확인\|완료 |
| `admin_users` | `DbAdminUser` | 관리자 계정. `password_hash`는 bcrypt |

#### RLS 정책 요약

- tutors / courses / reviews / faq / notices: 공개 SELECT 허용
- consults: 공개 INSERT 허용 (상담 신청 폼), SELECT/UPDATE/DELETE는 service role만
- admin_users: service role만 접근

### 이미지 (Cloudinary)

- 강사 이미지: `next-cloudinary`의 `CldUploadWidget` 사용 (upload preset: `jump_english`)
- 관리자 강사 폼에서 업로드 → `image_url` Cloudinary URL로 저장

### 관리자 인증

- **파일**: `src/proxy.ts` (Next.js 16에서 `middleware.ts` 대신 사용)
- **세션**: HMAC-SHA256 서명 쿠키 (`admin_session`, 8시간, httpOnly)
- **암호화**: Web Crypto API (`crypto.subtle`) — Edge Runtime 호환. `node:crypto` 사용 금지
- **계정 DB**: Supabase `admin_users` 테이블. 비밀번호는 bcrypt 해시
- **로그인 액션**: `src/app/admin/login/actions.ts` — Supabase 조회 → bcryptjs `compare()` → 세션 쿠키 발급
- **인증 유틸**: `src/lib/admin-auth.ts` — `createSessionToken()`, `verifySessionToken()` (모두 async)
- **보호 범위**: `/admin/:path*` 전체 (단, `/admin/login` 제외)

#### 관리자 계정 등록 SQL (Supabase SQL Editor)

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO public.admin_users (username, password_hash, display_name)
VALUES ('아이디', crypt('비밀번호', gen_salt('bf')), '표시이름');
```

### 관리자 페이지 패턴

- **페이지**: `async` 서버 컴포넌트 + `export const dynamic = "force-dynamic"` + Supabase 조회 → 클라이언트 Manager 컴포넌트에 `initialData` prop 전달
- **Manager 컴포넌트**: `src/components/admin/` — `"use client"`, `useTransition` + Server Actions + `router.refresh()`
- **Server Actions**: `src/app/admin/actions.ts` — `createAdminClient()` + `revalidatePath()` (admin + public 양쪽)
- **사이드바**: `src/components/admin-sidebar.tsx` — logout은 `<form action={logoutAction}>`

### 사이트 페이지 패턴

- **페이지**: `async` 서버 컴포넌트 + `export const dynamic = "force-dynamic"` + `createPublicClient()` 조회
- **인터랙티브 필터**: `src/components/site/` 클라이언트 컴포넌트로 분리 (tutors-list, courses-list, reviews-list, faq-list)
- **상담 신청**: `src/app/(site)/support/consult/actions.ts`의 `submitConsult` 서버 액션 호출

### 강사 소개 (`/tutors`)

카테고리 탭 필터 없음 — 전체 강사를 단순 그리드로 표시. `styles` 뱃지는 카드에 표시하지 않음.

## shadcn/ui v4 Conventions

- Style is `radix-nova` (see `components.json`)
- Button uses `asChild` prop with `Slot.Root` from `radix-ui` for polymorphic rendering
- Use `buttonVariants()` for link-as-button patterns (apply className to `<Link>`)
- CSS variables use oklch color space, defined in `globals.css`
- Dark mode via `.dark` class with `@custom-variant dark (&:is(.dark *))` in Tailwind v4
- **`SelectItem`의 `value`는 빈 문자열 불가** — "없음" 선택지는 `value="none"` 사용 후 submit 시 `null`로 변환

## Next.js 16 Conventions

- `error.tsx` uses `unstable_retry` prop (not `reset`) for retry functionality
- Root layout: ThemeProvider, TooltipProvider, Toaster만 포함. Header/Footer는 `(site)/layout.tsx`에 있음
- Use `createMetadata()` from `@/lib/metadata` for page-level metadata with OpenGraph/Twitter defaults
- Root metadata uses `title.template` pattern: `%s | Site Name`
- `"use client"` 페이지에서 `export const metadata`를 사용할 수 없음 → 형제 `layout.tsx`에 metadata를 export
- **미들웨어**: `middleware.ts` 대신 `proxy.ts` 사용 (Next.js 16 breaking change)
- **동적 페이지**: Supabase를 사용하는 모든 페이지에 `export const dynamic = "force-dynamic"` 필수 (빌드 시 env 없이 prerender 시도하면 오류)
- **Edge Runtime 금지**: `proxy.ts`에서 `node:crypto` 사용 불가 → `crypto.subtle` (Web Crypto API) 사용

## Known Gotchas

- **zod + react-hook-form**: `z.coerce.number()` 및 `z.preprocess()`는 output type이 `unknown`으로 추론되어 타입 에러 발생. 해결: `z.string()`으로 받고 `Number()` 변환 사용
- **React Compiler lint**: `Date.now()`, `Math.random()`은 event handler 내에서도 `react-hooks/purity` 에러 발생. `useRef` 카운터를 onSubmit에서 참조해도 "Cannot access refs during render" 에러 발생(JSX에 함수로 전달 시). 해결: `setState((prev) => [...prev, { id: \`prefix-${prev.length}\` }])` 패턴 사용
- **React Compiler lint**: `useRef`를 onSubmit에서 읽고 그 onSubmit을 `form.handleSubmit(onSubmit)`으로 JSX에 전달하면 에러 발생
- **SelectItem 빈 값**: shadcn/ui v4에서 `<SelectItem value="">` 허용 안 됨. `value="none"` 사용 후 submit 핸들러에서 `=== "none" ? null : value`로 변환
- **admin-auth.ts async**: `createSessionToken()`과 `verifySessionToken()`은 Web Crypto API 사용으로 모두 `async`. 호출 시 반드시 `await` 필요

## Project Layout

- `src/app/` — App Router pages and layouts
- `src/app/admin/actions.ts` — 모든 관리자 CRUD Server Actions
- `src/app/(site)/support/consult/actions.ts` — 상담 신청 Server Action
- `src/components/ui/` — shadcn/ui primitives
- `src/components/admin/` — 관리자 Manager 클라이언트 컴포넌트
- `src/components/site/` — 사이트 인터랙티브 클라이언트 컴포넌트
- `src/components/` — 공통 컴포넌트 (Header, Footer, admin-sidebar 등)
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/lib/metadata.ts` — `siteConfig` + `createMetadata()` helper
- `src/lib/supabase.ts` — Supabase 클라이언트 팩토리 + DB 타입 정의
- `src/lib/admin-auth.ts` — 세션 토큰 생성/검증 (Web Crypto HMAC)
- `src/proxy.ts` — 관리자 라우트 보호 미들웨어
- `src/data/` — 레거시 정적 데이터 (현재 미사용)
- `supabase/schema.sql` — DB 스키마 (Supabase SQL Editor에서 실행)
