import Link from "next/link";
import { HelpCircle, Bell, MessageCircle } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "고객지원",
  description: "Jump English 고객지원 센터입니다. FAQ, 공지사항, 1:1 상담을 이용하세요.",
});

const supportLinks = [
  {
    icon: HelpCircle,
    title: "자주 묻는 질문",
    description: "수업, 결제, 기술 지원 등 자주 묻는 질문을 확인하세요.",
    href: "/support/faq",
    label: "FAQ 보기",
  },
  {
    icon: Bell,
    title: "공지사항",
    description: "서비스 점검, 이벤트, 업데이트 등 최신 공지를 확인하세요.",
    href: "/support/notice",
    label: "공지 보기",
  },
  {
    icon: MessageCircle,
    title: "1:1 상담 신청",
    description: "궁금한 점이나 수강 상담이 필요하시면 언제든지 문의하세요.",
    href: "/support/consult",
    label: "상담 신청",
  },
];

export default function SupportPage() {
  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="고객지원"
            description="무엇이든 도와드리겠습니다. 아래 메뉴에서 원하는 지원 방법을 선택하세요."
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {supportLinks.map((item) => (
              <Card key={item.href} className="flex flex-col">
                <CardHeader className="items-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="size-7 text-primary" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-end justify-center">
                  <Link href={item.href} className={buttonVariants({ variant: "outline" })}>
                    {item.label}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t py-12">
        <Container>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-muted-foreground text-sm">운영 시간: 평일 오전 10시 ~ 오후 6시</p>
            <p className="text-muted-foreground text-sm">이메일: support@jump-english.co.kr</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
