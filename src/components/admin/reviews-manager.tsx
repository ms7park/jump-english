"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Star, Trash2 } from "lucide-react";
import { createReview, deleteReview } from "@/app/admin/actions";
import type { DbReview } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  name: z.string().min(2, "이름을 입력하세요."),
  course: z.string().min(1, "수강 과정을 입력하세요."),
  duration: z.string().min(1, "수강 기간을 입력하세요."),
  rating: z.string().min(1),
  content: z.string().min(10, "후기를 10자 이상 입력하세요."),
});

type FormValues = z.infer<typeof schema>;

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
      ))}
    </div>
  );
}

export function ReviewsManager({ initialReviews }: { initialReviews: DbReview[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [reviews] = useState<DbReview[]>(initialReviews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DbReview | null>(null);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", course: "", duration: "", rating: "5", content: "" },
  });

  function openAdd() {
    form.reset({ name: "", course: "", duration: "", rating: "5", content: "" });
    setDialogOpen(true);
  }

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        await createReview({
          name: values.name,
          course: values.course,
          duration: values.duration,
          rating: Number(values.rating),
          content: values.content,
        });
        toast.success("후기가 등록되었습니다.");
        setDialogOpen(false);
        router.refresh();
      } catch {
        toast.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteReview(deleteTarget.id);
        toast.success("후기가 삭제되었습니다.");
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
          <h1 className="text-2xl font-bold tracking-tight">수강 후기 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {reviews.length}개 · 평균 별점 {avgRating}</p>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4 mr-1" /> 후기 등록
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>수강생</TableHead>
            <TableHead>수강 과정</TableHead>
            <TableHead>기간</TableHead>
            <TableHead>별점</TableHead>
            <TableHead>내용</TableHead>
            <TableHead className="w-16 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{review.initials}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{review.name}</TableCell>
              <TableCell><Badge variant="secondary" className="text-xs">{review.course}</Badge></TableCell>
              <TableCell className="text-muted-foreground text-sm">{review.duration}</TableCell>
              <TableCell><StarRow rating={review.rating} /></TableCell>
              <TableCell>
                <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">{review.content}</p>
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(review)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>후기 등록</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>수강생 이름 *</FormLabel>
                    <FormControl><Input placeholder="홍길동" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="rating" render={({ field }) => (
                  <FormItem>
                    <FormLabel>별점 *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="별점 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["5", "4", "3", "2", "1"].map((v) => (
                          <SelectItem key={v} value={v}>{"★".repeat(Number(v))} ({v}점)</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="course" render={({ field }) => (
                  <FormItem>
                    <FormLabel>수강 과정 *</FormLabel>
                    <FormControl><Input placeholder="비즈니스 영어 심화" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="duration" render={({ field }) => (
                  <FormItem>
                    <FormLabel>수강 기간 *</FormLabel>
                    <FormControl><Input placeholder="6개월" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormLabel>후기 내용 *</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" placeholder="수강 후기를 입력하세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
                <Button type="submit" disabled={isPending}>등록</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>후기를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>{deleteTarget?.name}님의 후기가 삭제됩니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
