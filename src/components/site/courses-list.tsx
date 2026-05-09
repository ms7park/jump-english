"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { DbCourse } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const categories = ["기초", "중급", "고급", "비즈니스"] as const;

export function CoursesList({ courses }: { courses: DbCourse[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("기초");

  const filtered = courses.filter((c) => c.category === activeCategory);

  return (
    <>
      <section className="py-12">
        <div className="mx-auto w-full max-w-5xl px-4">
          <div className="mb-8">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList>
                {categories.map((cat) => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline">{course.category}</Badge>
                    {course.badge && <Badge className="bg-primary text-primary-foreground">{course.badge}</Badge>}
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.target}</CardDescription>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>기간: {course.duration}</span>
                    <span>주 {course.sessions_per_week}회</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-6">
                  <ul className="space-y-2">
                    {(course.features as string[]).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />{feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{course.price.toLocaleString()}원</p>
                      <p className="text-sm text-muted-foreground">월 기준</p>
                    </div>
                    <Link href="/support/consult" className={buttonVariants({ size: "sm" })}>수강 신청</Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price comparison table */}
      <section className="border-t py-12">
        <div className="mx-auto w-full max-w-5xl px-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>과정</TableHead>
                <TableHead className="text-center">수준</TableHead>
                <TableHead className="text-center">기간</TableHead>
                <TableHead className="text-center">주 횟수</TableHead>
                <TableHead className="text-right">월 가격</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    {course.name}
                    {course.badge && <Badge className="ml-2 bg-primary text-primary-foreground text-xs">{course.badge}</Badge>}
                  </TableCell>
                  <TableCell className="text-center"><Badge variant="outline">{course.category}</Badge></TableCell>
                  <TableCell className="text-center text-muted-foreground">{course.duration}</TableCell>
                  <TableCell className="text-center text-muted-foreground">주 {course.sessions_per_week}회</TableCell>
                  <TableCell className="text-right font-medium">{course.price.toLocaleString()}원</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
