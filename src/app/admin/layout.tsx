import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { logoutAction } from "@/app/admin/login/actions";

export const metadata: Metadata = {
  title: {
    default: "관리자",
    template: "%s | 관리자",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-end border-b bg-background px-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="size-4" />
              로그아웃
            </button>
          </form>
        </header>
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
