"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Star,
  HelpCircle,
  Bell,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "대시보드",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "강사 관리",
    href: "/admin/tutors",
    icon: Users,
  },
  {
    label: "수강 과정 관리",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "수강 후기 관리",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "고객지원",
    icon: MessageCircle,
    children: [
      { label: "FAQ 관리", href: "/admin/support/faq", icon: HelpCircle },
      { label: "공지사항 관리", href: "/admin/support/notice", icon: Bell },
      { label: "1:1 상담 관리", href: "/admin/support/consult", icon: MessageCircle },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-muted/30">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="text-base font-bold text-primary">
          Jump English
        </Link>
        <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
          관리자
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item) => {
          if (item.children) {
            const isGroupActive = item.children.some((c) => pathname.startsWith(c.href));
            return (
              <div key={item.label} className="space-y-0.5">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                    isGroupActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                  <ChevronRight className="ml-auto size-3" />
                </div>
                <div className="ml-4 space-y-0.5 border-l pl-3">
                  {item.children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                          isActive
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <child.icon className="size-3.5 shrink-0" />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground",
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="size-3 rotate-180" />
          사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
