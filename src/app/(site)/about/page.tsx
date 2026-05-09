import Link from "next/link";
import { CheckCircle2, MessageSquare, Users, BarChart3, Award } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = createMetadata({
  title: "서비스 소개",
  description: "Jump English는 1:1 맞춤 화상영어 서비스입니다. 원어민 강사와 함께 진짜 영어를 배우세요.",
});

const differentiators = [
  {
    icon: Users,
    title: "1:1 완전 맞춤형",
    description:
      "그룹 수업 없이 오직 나만을 위한 수업. 내 수준, 목표, 관심사에 맞춰 커리큘럼을 설계합니다.",
  },
  {
    icon: MessageSquare,
    title: "매 수업 상세 피드백",
    description:
      "수업 후 발음, 문법, 어휘 등 영역별 상세 피드백 리포트를 제공합니다. 눈에 보이는 성장을 경험하세요.",
  },
  {
    icon: BarChart3,
    title: "데이터 기반 학습",
    description:
      "학습 이력과 취약점 분석을 통해 최적의 학습 경로를 제안합니다. 비효율적인 공부는 이제 그만.",
  },
  {
    icon: Award,
    title: "엄선된 원어민 강사",
    description:
      "모든 강사는 TESOL/TEFL 자격증 보유 또는 5년 이상 경력자로, 3단계 심사를 통해 선발됩니다.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "무료 레벨 테스트",
    description: "10~15분 화상 인터뷰와 간단한 테스트로 정확한 수준을 파악합니다.",
  },
  {
    step: "02",
    title: "강사 & 과정 매칭",
    description: "레벨, 목표, 선호 스타일에 맞는 강사와 최적의 과정을 추천합니다.",
  },
  {
    step: "03",
    title: "1:1 맞춤 수업",
    description: "내 일정에 맞게 예약하고, 원어민 강사와 즐거운 영어 수업을 시작합니다.",
  },
  {
    step: "04",
    title: "피드백 & 성장",
    description: "매 수업 후 상세 피드백을 바탕으로 꾸준히 실력을 키워나갑니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="서비스 소개"
            description="Jump English는 '말문이 트이는 진짜 영어'를 모토로 탄생한 1:1 화상영어 서비스입니다."
          />
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            많은 분들이 수년간 영어를 공부해도 막상 외국인 앞에서는 말이 나오지 않는다고 합니다.
            Jump English는 그 이유가 &lsquo;말하기 연습 부족&rsquo;에 있다고 생각합니다.
            원어민 강사와의 1:1 수업으로 매일 실제로 말하고, 즉각적인 피드백을 받으며,
            진짜 사용되는 영어를 습득할 수 있도록 돕겠습니다.
          </p>
        </Container>
      </section>

      {/* Why Jump English */}
      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight">왜 Jump English인가</h2>
            <p className="mt-2 text-muted-foreground">다른 화상영어와 무엇이 다른지 확인해보세요</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {differentiators.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      {/* Platform */}
      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight">수업 방식</h2>
            <p className="mt-2 text-muted-foreground">언제 어디서나 편리하게 수업받으세요</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">지원 플랫폼</h3>
              <ul className="space-y-3">
                {[
                  "PC / 노트북 웹 브라우저 — 설치 없이 바로 시작",
                  "iOS / Android 앱 — 스마트폰, 태블릿 지원",
                  "Zoom 연동 지원 — 익숙한 환경 그대로 사용 가능",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">수업 특징</h3>
              <ul className="space-y-3">
                {[
                  "새벽 6시 ~ 밤 11시 — 내 일정에 맞는 시간 선택",
                  "수업 녹화 파일 — 수업 후 복습 가능 (30일 보관)",
                  "수업 전 예습 자료 — 강사가 직접 준비한 맞춤 자료",
                  "발음 교정 AI — 발음 분석 및 교정 피드백 제공",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Separator />

      {/* Process */}
      <section className="py-16">
        <Container>
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight">수업 진행 흐름</h2>
            <p className="mt-2 text-muted-foreground">4단계로 완성하는 나만의 영어 성장 여정</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-muted/40 py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="secondary">지금 바로 시작</Badge>
            <h2 className="text-2xl font-bold">오늘 무료로 레벨을 확인해 보세요</h2>
            <p className="max-w-md text-muted-foreground">
              10분이면 충분합니다. 내 수준을 정확히 파악하고 맞춤 강사를 추천받으세요.
            </p>
            <Link href="/support/consult" className={buttonVariants({ size: "lg" })}>
              무료 레벨 테스트 신청
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
