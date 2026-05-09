"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createFaq, updateFaq, deleteFaq } from "@/app/admin/actions";
import type { DbFaq } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  question: z.string().min(5, "질문을 입력하세요."),
  answer: z.string().min(10, "답변을 10자 이상 입력하세요."),
  category: z.enum(["수업", "결제", "기술", "기타"]),
});

type FormValues = z.infer<typeof schema>;

const catVariant: Record<string, "default" | "secondary" | "outline"> = {
  수업: "default", 결제: "secondary", 기술: "outline", 기타: "outline",
};

export function FaqManager({ initialFaqs }: { initialFaqs: DbFaq[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [faqs] = useState<DbFaq[]>(initialFaqs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DbFaq | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DbFaq | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  function openAdd() {
    setEditTarget(null);
    form.reset({ question: "", answer: "", category: "수업" });
    setDialogOpen(true);
  }

  function openEdit(faq: DbFaq) {
    setEditTarget(faq);
    form.reset({ question: faq.question, answer: faq.answer, category: faq.category });
    setDialogOpen(true);
  }

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (editTarget) {
          await updateFaq(editTarget.id, values);
          toast.success("FAQ가 수정되었습니다.");
        } else {
          await createFaq(values);
          toast.success("FAQ가 추가되었습니다.");
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
        await deleteFaq(deleteTarget.id);
        toast.success("FAQ가 삭제되었습니다.");
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
          <h1 className="text-2xl font-bold tracking-tight">FAQ 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {faqs.length}개</p>
        </div>
        <Button onClick={openAdd} size="sm"><Plus className="size-4 mr-1" /> FAQ 추가</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">카테고리</TableHead>
            <TableHead>질문</TableHead>
            <TableHead>답변</TableHead>
            <TableHead className="w-24 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faqs.map((faq) => (
            <TableRow key={faq.id}>
              <TableCell><Badge variant={catVariant[faq.category]}>{faq.category}</Badge></TableCell>
              <TableCell className="font-medium max-w-xs"><p className="line-clamp-2">{faq.question}</p></TableCell>
              <TableCell><p className="text-sm text-muted-foreground line-clamp-2 max-w-sm">{faq.answer}</p></TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(faq)}><Pencil className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(faq)}><Trash2 className="size-3.5" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editTarget ? "FAQ 수정" : "FAQ 추가"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>카테고리 *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{["수업", "결제", "기술", "기타"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                  </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="question" render={({ field }) => (
                <FormItem><FormLabel>질문 *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="answer" render={({ field }) => (
                <FormItem><FormLabel>답변 *</FormLabel><FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
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
          <AlertDialogHeader><AlertDialogTitle>FAQ를 삭제하시겠습니까?</AlertDialogTitle><AlertDialogDescription>이 FAQ가 삭제됩니다.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
