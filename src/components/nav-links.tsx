"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  { href: "/", label: "홈" },
  { href: "/about", label: "서비스 소개" },
  { href: "/tutors", label: "강사 소개" },
  { href: "/courses", label: "수강 과정" },
  { href: "/reviews", label: "수강 후기" },
];

const supportItems = [
  { href: "/support/faq", label: "자주 묻는 질문" },
  { href: "/support/notice", label: "공지사항" },
  { href: "/support/consult", label: "1:1 상담 신청" },
];

export function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isSupportActive = pathname.startsWith("/support");
  const isMobile = !!onNavigate;

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}

      {isMobile ? (
        <>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
            고객지원
          </span>
          {supportItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "pl-2 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground",
                isSupportActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              고객지원
              <ChevronDown className="size-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {supportItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}
