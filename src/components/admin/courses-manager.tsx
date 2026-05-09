"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createCourse, updateCourse, deleteCourse } from "@/app/admin/actions";
import type { DbCourse } from "@/lib/supabase";
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
  name: z.string().min(1, "과정명을 입력하세요."),
  category: z.enum(["기초", "중급", "고급", "비즈니스"]),
  target: z.string().min(1, "대상을 입력하세요."),
  duration: z.string().min(1, "기간을 입력하세요."),
  sessions_per_week: z.string().min(1),
  price: z.string().min(1, "가격을 입력하세요."),
  features: z.string().min(1, "특징을 입력하세요."),
  badge: z.enum(["인기", "신규", "추천", "none"]).optional(),
});

type FormValues = z.infer<typeof schema>;

const badgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  인기: "default", 신규: "secondary", 추천: "outline",
};

export function CoursesManager({ initialCourses }: { initialCourses: DbCourse[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [courses] = useState<DbCourse[]>(initialCourses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DbCourse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DbCourse | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  function openAdd() {
    setEditTarget(null);
    form.reset({ name: "", category: "기초", target: "", duration: "", sessions_per_week: "3", price: "89000", features: "", badge: "none" });
    setDialogOpen(true);
  }

  function openEdit(course: DbCourse) {
    setEditTarget(course);
    form.reset({
      name: course.name,
      category: course.category,
      target: course.target,
      duration: course.duration,
      sessions_per_week: String(course.sessions_per_week),
      price: String(course.price),
      features: course.features.join("\n"),
      badge: course.badge ?? "none",
    });
    setDialogOpen(true);
  }

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      category: values.category,
      target: values.target,
      duration: values.duration,
      sessions_per_week: Number(values.sessions_per_week),
      price: Number(values.price),
      features: values.features.split("\n").map((s) => s.trim()).filter(Boolean),
      badge: values.badge === "none" ? null : (values.badge ?? null),
    };

    startTransition(async () => {
      try {
        if (editTarget) {
          await updateCourse(editTarget.id, payload);
          toast.success("과정 정보가 수정되었습니다.");
        } else {
          await createCourse(payload);
          toast.success("과정이 추가되었습니다.");
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
        await deleteCourse(deleteTarget.id);
        toast.success(`"${deleteTarget.name}" 과정이 삭제되었습니다.`);
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
          <h1 className="text-2xl font-bold tracking-tight">수강 과정 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {courses.length}개 과정</p>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4 mr-1" /> 과정 추가
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>과정명</TableHead>
            <TableHead>분류</TableHead>
            <TableHead>기간</TableHead>
            <TableHead>주 횟수</TableHead>
            <TableHead>가격 (월)</TableHead>
            <TableHead>뱃지</TableHead>
            <TableHead className="w-24 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{course.target}</p>
                </div>
              </TableCell>
              <TableCell><Badge variant="outline">{course.category}</Badge></TableCell>
              <TableCell className="text-muted-foreground">{course.duration}</TableCell>
              <TableCell className="text-muted-foreground">주 {course.sessions_per_week}회</TableCell>
              <TableCell className="font-medium">{course.price.toLocaleString()}원</TableCell>
              <TableCell>
                {course.badge && <Badge variant={badgeVariant[course.badge]}>{course.badge}</Badge>}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(course)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(course)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? "과정 수정" : "과정 추가"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>과정명 *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>분류 *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["기초", "중급", "고급", "비즈니스"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="target" render={({ field }) => (
                <FormItem><FormLabel>대상 *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField control={form.control} name="duration" render={({ field }) => (
                  <FormItem><FormLabel>기간 *</FormLabel><FormControl><Input placeholder="3개월" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="sessions_per_week" render={({ field }) => (
                  <FormItem><FormLabel>주 횟수 *</FormLabel><FormControl><Input type="number" min={1} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>월 가격 (원) *</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="features" render={({ field }) => (
                <FormItem>
                  <FormLabel>특징 * <span className="text-muted-foreground font-normal">(줄바꿈으로 구분)</span></FormLabel>
                  <FormControl><Textarea className="min-h-[80px]" placeholder={"1:1 맞춤 수업\n수업 녹화 파일 제공"} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="badge" render={({ field }) => (
                <FormItem><FormLabel>뱃지</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? "none"}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue placeholder="없음" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="none">없음</SelectItem>
                      {["인기", "신규", "추천"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select><FormMessage /></FormItem>
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
          <AlertDialogHeader>
            <AlertDialogTitle>과정을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>&ldquo;{deleteTarget?.name}&rdquo; 과정이 삭제됩니다.</AlertDialogDescription>
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
