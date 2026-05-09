export const dynamic = "force-dynamic";

import Link from "next/link";
import { Users, BookOpen, Star, MessageCircle, HelpCircle, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [
    { count: tutorCount },
    { count: courseCount },
    { count: reviewCount },
    { count: pendingConsultCount },
    { count: faqCount },
    { count: noticeCount },
  ] = await Promise.all([
    supabase.from("tutors").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("consults").select("*", { count: "exact", head: true }).eq("status", "대기"),
    supabase.from("faq").select("*", { count: "exact", head: true }),
    supabase.from("notices").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "강사",
      value: tutorCount ?? 0,
      icon: Users,
      href: "/admin/tutors",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "수강 과정",
      value: courseCount ?? 0,
      icon: BookOpen,
      href: "/admin/courses",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      label: "수강 후기",
      value: reviewCount ?? 0,
      icon: Star,
      href: "/admin/reviews",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      label: "미처리 상담",
      value: pendingConsultCount ?? 0,
      icon: MessageCircle,
      href: "/admin/support/consult",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-950",
    },
    {
      label: "FAQ",
      value: faqCount ?? 0,
      icon: HelpCircle,
      href: "/admin/support/faq",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950",
    },
    {
      label: "공지사항",
      value: noticeCount ?? 0,
      icon: Bell,
      href: "/admin/support/notice",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  const shortcuts = [
    { label: "강사 관리", href: "/admin/tutors", icon: Users },
    { label: "수강 과정 관리", href: "/admin/courses", icon: BookOpen },
    { label: "수강 후기 관리", href: "/admin/reviews", icon: Star },
    { label: "FAQ 관리", href: "/admin/support/faq", icon: HelpCircle },
    { label: "공지사항 관리", href: "/admin/support/notice", icon: Bell },
    { label: "1:1 상담 관리", href: "/admin/support/consult", icon: MessageCircle },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground text-sm mt-1">Jump English 관리자 패널에 오신 것을 환영합니다.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon className={`size-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="text-base font-semibold mb-4">빠른 메뉴</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
