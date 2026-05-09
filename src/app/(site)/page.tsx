export const dynamic = "force-dynamic";

import Link from "next/link";
import { UserCheck, Clock, Globe, GraduationCap, Star, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/container";
import { createPublicClient } from "@/lib/supabase";

const features = [
  { icon: UserCheck, title: "1:1 맞춤 수업", description: "내 수준과 목표에 딱 맞는 커리큘럼. 그룹 수업 없이 오직 나만을 위한 수업." },
  { icon: Clock, title: "24시간 예약", description: "새벽 6시부터 밤 11시까지, 내 일정에 맞게 자유롭게 예약하세요." },
  { icon: Globe, title: "검증된 원어민 강사", description: "미국, 영국, 캐나다, 호주 출신의 엄선된 원어민 강사 50명+." },
  { icon: GraduationCap, title: "무료 레벨 테스트", description: "지금 내 수준이 궁금하다면? 무료로 레벨 테스트를 받아보세요." },
];

export default async function Home() {
  const supabase = createPublicClient();

  const [{ data: previewTutors }, { data: previewCourses }, { data: previewReviews }] =
    await Promise.all([
      supabase.from("tutors").select("*").order("sort_order").order("created_at").limit(3),
      supabase.from("courses").select("*").order("sort_order").order("created_at").limit(3),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(3),
    ]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.7_0.2_255_/_20%)_0%,_transparent_60%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center md:py-32">
          <Badge className="bg-white/20 text-white hover:bg-white/30">원어민 1:1 화상영어</Badge>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            말문이 트이는 <span className="text-blue-200">진짜 영어</span>
          </h1>
          <p className="max-w-xl text-lg text-blue-100 sm:text-xl">
            1:1 맞춤 화상영어로 자신감 있게 말하세요.
            <br className="hidden sm:block" />
            레벨 테스트부터 강사 매칭까지, 모든 게 무료입니다.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/support/consult" className={buttonVariants({ size: "lg", className: "bg-white text-blue-700 hover:bg-blue-50" })}>
              무료 레벨 테스트 신청
            </Link>
            <Link href="/about" className={buttonVariants({ size: "lg", variant: "outline", className: "border-white/60 text-white hover:bg-white/10" })}>
              서비스 소개 →
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 text-blue-100">
            {[["1,000명+", "누적 수강생"], ["50명+", "원어민 강사"], ["98%", "수강생 만족도"]].map(([val, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{val}</span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Jump English가 다른 이유</h2>
            <p className="mt-2 text-muted-foreground">진짜 실력을 키우는 네 가지 차별점</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader className="items-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Tutors preview */}
      {(previewTutors?.length ?? 0) > 0 && (
        <section className="bg-muted/40 py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">검증된 원어민 강사진</h2>
                <p className="mt-2 text-muted-foreground">모든 강사는 TESOL/TEFL 자격증 보유 또는 5년 이상 경력자입니다</p>
              </div>
              <Link href="/tutors" className="hidden text-sm font-medium text-primary hover:underline sm:block">전체 강사 보기 →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {previewTutors!.map((tutor) => (
                <Card key={tutor.id}>
                  <CardHeader className="items-center text-center">
                    <Avatar className="size-16">
                      {tutor.image_url && <AvatarImage src={tutor.image_url} alt={tutor.name} />}
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">{tutor.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{tutor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tutor.nationality_flag} {tutor.nationality} · {tutor.major}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">경력 {tutor.experience}년</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {(tutor.styles as string[]).map((style) => (
                        <Badge key={style} variant="secondary" className="text-xs">{style}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Courses preview */}
      {(previewCourses?.length ?? 0) > 0 && (
        <section className="py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">수강 과정 & 가격</h2>
                <p className="mt-2 text-muted-foreground">내 목표에 맞는 과정을 선택하세요</p>
              </div>
              <Link href="/courses" className="hidden text-sm font-medium text-primary hover:underline sm:block">전체 과정 보기 →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {previewCourses!.map((course) => (
                <Card key={course.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.category}</Badge>
                      {course.badge && <Badge className="bg-primary text-primary-foreground">{course.badge}</Badge>}
                    </div>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.target}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4">
                    <ul className="space-y-1.5">
                      {(course.features as string[]).slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />{feature}
                        </li>
                      ))}
                    </ul>
                    <p className="text-2xl font-bold">
                      {course.price.toLocaleString()}원
                      <span className="text-sm font-normal text-muted-foreground"> / 월</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Reviews preview */}
      {(previewReviews?.length ?? 0) > 0 && (
        <section className="bg-muted/40 py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">수강생 후기</h2>
                <p className="mt-2 text-muted-foreground">실제 수강생들의 솔직한 이야기</p>
              </div>
              <Link href="/reviews" className="hidden text-sm font-medium text-primary hover:underline sm:block">전체 후기 보기 →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {previewReviews!.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">{review.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.course} · {review.duration}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 py-20 text-white">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">오늘 바로 시작하세요</h2>
          <p className="text-lg text-blue-100">무료 레벨 테스트로 내 수준을 확인하고,<br />딱 맞는 강사와 첫 수업을 경험해 보세요.</p>
          <Link href="/support/consult" className={buttonVariants({ size: "lg", className: "bg-white text-blue-700 hover:bg-blue-50" })}>
            무료 레벨 테스트 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
