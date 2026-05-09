"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { submitConsult } from "./actions";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const consultSchema = z.object({
  name: z.string().min(2, "이름을 2자 이상 입력해주세요."),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "올바른 연락처를 입력해주세요. (숫자만, 10~11자리)"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  course: z.string().min(1, "관심 과정을 선택해주세요."),
  contactTime: z.string().min(1, "희망 연락 시간을 선택해주세요."),
  message: z.string().max(500, "500자 이내로 입력해주세요.").optional(),
});

type ConsultFormValues = z.infer<typeof consultSchema>;

export default function ConsultPage() {
  const form = useForm<ConsultFormValues>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      course: "",
      contactTime: "",
      message: "",
    },
  });

  async function onSubmit(data: ConsultFormValues) {
    try {
      await submitConsult({
        name: data.name,
        phone: data.phone,
        email: data.email,
        course: data.course,
        contactTime: data.contactTime,
        message: data.message || undefined,
      });
      toast.success("상담 신청이 완료되었습니다!", {
        description: `${data.name}님, 선택하신 시간대에 연락드리겠습니다. 감사합니다!`,
      });
      form.reset();
    } catch {
      toast.error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="1:1 상담 신청"
            description="궁금한 점이나 수강 문의를 남겨주세요. 평일 10시~18시 이내에 연락드립니다."
          />
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>상담 신청서</CardTitle>
              <CardDescription>
                무료 레벨 테스트 신청도 이 폼을 이용해 주세요. 모든 항목을 입력해 주시면 더 빠른 상담이 가능합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름 *</FormLabel>
                          <FormControl>
                            <Input placeholder="홍길동" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>연락처 *</FormLabel>
                          <FormControl>
                            <Input placeholder="01012345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일 *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>관심 과정 *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="과정 선택" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">기초 과정</SelectItem>
                              <SelectItem value="intermediate">중급 과정</SelectItem>
                              <SelectItem value="advanced">고급 과정</SelectItem>
                              <SelectItem value="business">비즈니스 과정</SelectItem>
                              <SelectItem value="level-test">무료 레벨 테스트만</SelectItem>
                              <SelectItem value="undecided">아직 모르겠어요</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>희망 연락 시간 *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="시간대 선택" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">오전 (10시~12시)</SelectItem>
                              <SelectItem value="afternoon">오후 (12시~15시)</SelectItem>
                              <SelectItem value="late-afternoon">오후 늦게 (15시~18시)</SelectItem>
                              <SelectItem value="anytime">아무 때나 가능</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 내용 (선택)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="현재 영어 수준, 학습 목표, 궁금한 점 등을 자유롭게 적어주세요."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "신청 중..." : "상담 신청하기"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
