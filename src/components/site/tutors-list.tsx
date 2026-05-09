import Link from "next/link";
import type { DbTutor } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

export function TutorsList({ tutors }: { tutors: DbTutor[] }) {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <Card key={tutor.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-14">
                    {tutor.image_url && <AvatarImage src={tutor.image_url} alt={tutor.name} />}
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">{tutor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{tutor.name}</CardTitle>
                      <Badge variant="outline" className="text-xs shrink-0">{tutor.nationality_flag} {tutor.nationality}</Badge>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{tutor.major}</p>
                    <p className="text-xs text-muted-foreground">경력 {tutor.experience}년</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{tutor.bio}</p>
                <Link href="/support/consult" className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}>
                  이 강사로 상담 신청
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        {tutors.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">등록된 강사가 없습니다.</div>
        )}
      </div>
    </section>
  );
}
