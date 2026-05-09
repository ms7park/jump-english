"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, Trash2 } from "lucide-react";
import { updateConsultStatus, deleteConsult } from "@/app/admin/actions";
import type { DbConsult } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Status = "대기" | "확인" | "완료";

const statusColor: Record<Status, string> = {
  대기: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  확인: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  완료: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
};

export function ConsultManager({ initialConsults }: { initialConsults: DbConsult[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [consults] = useState<DbConsult[]>(initialConsults);
  const [viewTarget, setViewTarget] = useState<DbConsult | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DbConsult | null>(null);

  const pendingCount = consults.filter((c) => c.status === "대기").length;

  function handleStatusChange(id: string, status: Status) {
    startTransition(async () => {
      try {
        await updateConsultStatus(id, status);
        toast.success("상태가 변경되었습니다.");
        router.refresh();
      } catch {
        toast.error("상태 변경 중 오류가 발생했습니다.");
      }
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteConsult(deleteTarget.id);
        toast.success("상담 신청이 삭제되었습니다.");
        setDeleteTarget(null);
        router.refresh();
      } catch {
        toast.error("삭제 중 오류가 발생했습니다.");
      }
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">1:1 상담 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {consults.length}건 · 미처리 {pendingCount}건</p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>신청자</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>관심 과정</TableHead>
            <TableHead>희망 연락 시간</TableHead>
            <TableHead>신청일</TableHead>
            <TableHead className="w-32">상태</TableHead>
            <TableHead className="w-24 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consults.map((consult) => (
            <TableRow key={consult.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{consult.name}</p>
                  <p className="text-xs text-muted-foreground">{consult.email}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm">{consult.phone}</TableCell>
              <TableCell><Badge variant="secondary" className="text-xs">{consult.course}</Badge></TableCell>
              <TableCell className="text-sm text-muted-foreground">{consult.contact_time}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{consult.created_at.slice(0, 10)}</TableCell>
              <TableCell>
                <Select
                  value={consult.status}
                  onValueChange={(v) => handleStatusChange(consult.id, v as Status)}
                  disabled={isPending}
                >
                  <SelectTrigger className={`h-7 w-full text-xs ${statusColor[consult.status as Status]}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="대기">대기</SelectItem>
                    <SelectItem value="확인">확인</SelectItem>
                    <SelectItem value="완료">완료</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => setViewTarget(consult)}><Eye className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(consult)}><Trash2 className="size-3.5" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Detail Dialog */}
      <Dialog open={!!viewTarget} onOpenChange={(o) => !o && setViewTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>상담 신청 상세</DialogTitle></DialogHeader>
          {viewTarget && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">이름</p><p className="font-medium">{viewTarget.name}</p></div>
                <div><p className="text-xs text-muted-foreground">신청일</p><p>{viewTarget.created_at.slice(0, 10)}</p></div>
                <div><p className="text-xs text-muted-foreground">연락처</p><p>{viewTarget.phone}</p></div>
                <div><p className="text-xs text-muted-foreground">이메일</p><p>{viewTarget.email}</p></div>
                <div><p className="text-xs text-muted-foreground">관심 과정</p><p>{viewTarget.course}</p></div>
                <div><p className="text-xs text-muted-foreground">희망 연락 시간</p><p>{viewTarget.contact_time}</p></div>
              </div>
              {viewTarget.message && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">문의 내용</p>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{viewTarget.message}</p>
                  </div>
                </>
              )}
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-2">상태 변경</p>
                <Select
                  value={viewTarget.status}
                  onValueChange={(v) => {
                    handleStatusChange(viewTarget.id, v as Status);
                    setViewTarget((prev) => prev ? { ...prev, status: v as Status } : null);
                  }}
                >
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="대기">대기</SelectItem>
                    <SelectItem value="확인">확인</SelectItem>
                    <SelectItem value="완료">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>상담 신청을 삭제하시겠습니까?</AlertDialogTitle><AlertDialogDescription>{deleteTarget?.name}님의 상담 신청이 삭제됩니다.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
