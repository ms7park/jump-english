"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { createTutor, updateTutor, deleteTutor } from "@/app/admin/actions";
import type { DbTutor } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const schema = z.object({
  name: z.string().min(2, "이름을 입력하세요."),
  nationality: z.string().min(1, "국적을 입력하세요."),
  nationality_flag: z.string().min(1, "국기 이모지를 입력하세요."),
  major: z.string().min(1, "전공을 입력하세요."),
  experience: z.string().min(1, "경력 연수를 입력하세요."),
  styles: z.string().min(1, "교수 스타일을 입력하세요."),
  bio: z.string().min(10, "소개를 10자 이상 입력하세요."),
});

type FormValues = z.infer<typeof schema>;

export function TutorsManager({ initialTutors }: { initialTutors: DbTutor[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tutors] = useState<DbTutor[]>(initialTutors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<DbTutor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DbTutor | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  function openAdd() {
    setEditTarget(null);
    setImageUrl(null);
    form.reset({ name: "", nationality: "", nationality_flag: "🇺🇸", major: "", experience: "1", styles: "", bio: "" });
    setDialogOpen(true);
  }

  function openEdit(tutor: DbTutor) {
    setEditTarget(tutor);
    setImageUrl(tutor.image_url);
    form.reset({
      name: tutor.name,
      nationality: tutor.nationality,
      nationality_flag: tutor.nationality_flag,
      major: tutor.major,
      experience: String(tutor.experience),
      styles: tutor.styles.join(", "),
      bio: tutor.bio,
    });
    setDialogOpen(true);
  }

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      nationality: values.nationality,
      nationality_flag: values.nationality_flag,
      major: values.major,
      experience: Number(values.experience),
      styles: values.styles.split(",").map((s) => s.trim()).filter(Boolean),
      bio: values.bio,
      image_url: imageUrl,
    };

    startTransition(async () => {
      try {
        if (editTarget) {
          await updateTutor(editTarget.id, payload);
          toast.success("강사 정보가 수정되었습니다.");
        } else {
          await createTutor(payload);
          toast.success("강사가 추가되었습니다.");
        }
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
        await deleteTutor(deleteTarget.id);
        toast.success(`${deleteTarget.name} 강사가 삭제되었습니다.`);
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
          <h1 className="text-2xl font-bold tracking-tight">강사 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">총 {tutors.length}명</p>
        </div>
        <Button onClick={openAdd} size="sm">
          <Plus className="size-4 mr-1" /> 강사 추가
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>이름</TableHead>
            <TableHead>국적</TableHead>
            <TableHead>전공</TableHead>
            <TableHead>경력</TableHead>
            <TableHead>교수 스타일</TableHead>
            <TableHead className="w-24 text-right">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutors.map((tutor) => (
            <TableRow key={tutor.id}>
              <TableCell>
                <Avatar className="size-8">
                  {tutor.image_url && <AvatarImage src={tutor.image_url} alt={tutor.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{tutor.initials}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{tutor.name}</TableCell>
              <TableCell>{tutor.nationality_flag} {tutor.nationality}</TableCell>
              <TableCell className="text-muted-foreground">{tutor.major}</TableCell>
              <TableCell>{tutor.experience}년</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {tutor.styles.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => openEdit(tutor)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(tutor)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? "강사 수정" : "강사 추가"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* 이미지 업로드 */}
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  {imageUrl && <AvatarImage src={imageUrl} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {form.watch("name")?.slice(0, 2).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? "jump_english" : undefined}
                  onSuccess={(result) => {
                    if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
                      setImageUrl(result.info.secure_url as string);
                    }
                  }}
                >
                  {({ open }) => (
                    <Button type="button" variant="outline" size="sm" onClick={() => open()}>
                      이미지 업로드
                    </Button>
                  )}
                </CldUploadWidget>
                {imageUrl && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setImageUrl(null)}>
                    제거
                  </Button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>이름 *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem><FormLabel>경력 (년) *</FormLabel><FormControl><Input type="number" min={1} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField control={form.control} name="nationality" render={({ field }) => (
                  <FormItem><FormLabel>국적 *</FormLabel><FormControl><Input placeholder="미국" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nationality_flag" render={({ field }) => (
                  <FormItem><FormLabel>국기 이모지 *</FormLabel><FormControl><Input placeholder="🇺🇸" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="major" render={({ field }) => (
                <FormItem><FormLabel>전공 *</FormLabel><FormControl><Input placeholder="영어교육학" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="styles" render={({ field }) => (
                <FormItem>
                  <FormLabel>교수 스타일 * <span className="text-muted-foreground font-normal">(쉼표로 구분)</span></FormLabel>
                  <FormControl><Input placeholder="비즈니스, 면접, 프레젠테이션" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bio" render={({ field }) => (
                <FormItem><FormLabel>소개 *</FormLabel><FormControl><Textarea className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
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
            <AlertDialogTitle>강사를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>{deleteTarget?.name} 강사의 데이터가 삭제됩니다.</AlertDialogDescription>
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
