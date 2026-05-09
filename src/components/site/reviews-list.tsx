"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { DbReview } from "@/lib/supabase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courseFilters = ["전체", "기초", "중급", "고급", "비즈니스"];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );
}

export function ReviewsList({ reviews }: { reviews: DbReview[] }) {
  const [activeFilter, setActiveFilter] = useState("전체");

  const filtered =
    activeFilter === "전체"
      ? reviews
      : reviews.filter((r) => {
          if (activeFilter === "기초") return r.course.includes("첫걸음") || r.course.includes("생존");
          if (activeFilter === "중급") return r.course.includes("자유") || r.course.includes("뉴스");
          if (activeFilter === "고급") return r.course.includes("고급") || r.course.includes("IELTS") || r.course.includes("TOEFL");
          if (activeFilter === "비즈니스") return r.course.includes("비즈니스") || r.course.includes("협상");
          return true;
        });

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <div className="mx-auto w-full max-w-5xl px-4">
          <div className="mt-8 flex flex-wrap gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{avgRating}</span>
                <div>
                  <StarRow rating={5} />
                  <p className="text-xs text-muted-foreground mt-0.5">평균 별점</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-3xl font-bold">{reviews.length}개+</span>
              <span className="text-sm text-muted-foreground">누적 후기</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-3xl font-bold">82%</span>
              <span className="text-sm text-muted-foreground">재등록률</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-5xl px-4">
          <div className="mb-8">
            <Tabs value={activeFilter} onValueChange={setActiveFilter}>
              <TabsList className="flex-wrap h-auto gap-1">
                {courseFilters.map((f) => <TabsTrigger key={f} value={f}>{f}</TabsTrigger>)}
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">{review.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.duration}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit text-xs">{review.course}</Badge>
                  <StarRow rating={review.rating} />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">해당 과정의 후기가 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
}
