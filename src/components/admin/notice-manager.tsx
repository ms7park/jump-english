"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createNotice, updateNotice, deleteNotice } from "@/app/admin/actions";
import type { DbNotice } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
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
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(2, "제목을 입력하세요."),
  category: z.enum(["공지", "이벤트", "업데이트"]),
  date: z.string().min(1, "날짜를 입력하세요."),
  content: z.string().min(10, "내용을 10자 이상 입력하세요."),
  important: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const catVariant: Record<string, "default" | "secondary" | "outline"> = {
  공지: "default", 이벤트: "secondary", 업데이트: "outline",
};

export function NoticeManager({ initialNotices }: { initialNotices: DbNotice[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notices] = useState<DbNotice[]>(initialNotices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DbNotice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DbNotice | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  function openAdd() {
    setEditTarget(null);
    form.reset({ title: "", category: "공지", date: new Date().toISOString().slice(0, 10), content: "", important: false });
    setDialogOpen(true);
  }

  function openEdit(notice: DbNotice) {
    setEditTarget(notice);
    form.reset({ title: notice.title, category: notice.category, date: notice.date, content: notice.content, important: notice.important });
    setDialogOpen(true);
  }

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (editTarget) {
          await updateNotice(editTarget.id, values);
          toast.success("공지사항이 수정되었습니다.");
        } else {
          await createNotice(values);
          toast.success("공지사항이 추가되었습니다.");
        }
        setDialogOpen(false);
        router.refresh();
      } catch {
        toast.error("오류가 발생했습니다.");
      }
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteNotice(deleteTarget.id);
        toast.success("공지사항이 삭제되었습니다.");
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
          <h1 className="text-2xl font-bold tracking-tight">공지사항 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {notices.length}개</p>
        </div>
        <Button onClick={openAdd} size="sm"><Plus className="size-4 mr-1" /> 공지 추가</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">구분</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-28">날짜</TableHead>
            <TableHead className="w-16 text-center">중요</TableHead>
            <TableHead className="w-24 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id}>
              <TableCell><Badge variant={catVariant[notice.category]}>{notice.category}</Badge></TableCell>
              <TableCell>
                <p className="font-medium line-clamp-1">{notice.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{notice.content.split("\n")[0]}</p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{notice.date}</TableCell>
              <TableCell className="text-center">
                {notice.important && <Badge variant="destructive" className="text-xs">중요</Badge>}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(notice)}><Pencil className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(notice)}><Trash2 className="size-3.5" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editTarget ? "공지 수정" : "공지 추가"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>구분 *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{["공지", "이벤트", "업데이트"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>날짜 *</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>제목 *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem><FormLabel>내용 *</FormLabel><FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="important" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="font-normal">중요 공지로 표시</FormLabel>
                  </div>
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
                <Button type="submit" disabled={isPending}>{editTarget ? "수정" : "추가"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>공지사항을 삭제하시겠습니까?</AlertDialogTitle><AlertDialogDescription>이 공지사항이 삭제됩니다.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
