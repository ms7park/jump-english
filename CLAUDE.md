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
- **Path alias**: `@/*` maps to `./src/*`

## shadcn/ui v4 Conventions

- Style is `radix-nova` (see `components.json`)
- Button uses `asChild` prop with `Slot.Root` from `radix-ui` for polymorphic rendering
- Use `buttonVariants()` for link-as-button patterns (apply className to `<Link>`)
- CSS variables use oklch color space, defined in `globals.css`
- Dark mode via `.dark` class with `@custom-variant dark (&:is(.dark *))` in Tailwind v4

## Next.js 16 Conventions

- `error.tsx` uses `unstable_retry` prop (not `reset`) for retry functionality
- Layout wraps children with ThemeProvider, TooltipProvider, Header, Footer, and Toaster
- Use `createMetadata()` from `@/lib/metadata` for page-level metadata with OpenGraph/Twitter defaults
- Root metadata uses `title.template` pattern: `%s | Site Name`

## Project Layout

- `src/app/` — App Router pages and layouts
- `src/components/ui/` — shadcn/ui primitives
- `src/components/` — App-level components (Header, Footer, ThemeProvider, etc.)
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/lib/metadata.ts` — `siteConfig` + `createMetadata()` helper
