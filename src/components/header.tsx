import Link from "next/link";
import { siteConfig } from "@/lib/metadata";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-primary">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4">
          <NavLinks className="hidden md:flex" />
          <Link
            href="/support/consult"
            className={buttonVariants({ size: "sm", className: "hidden md:inline-flex" })}
          >
            무료 레벨 테스트 신청
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
