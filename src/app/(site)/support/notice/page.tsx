export const dynamic = "force-dynamic";

import { createMetadata } from "@/lib/metadata";
import { createPublicClient } from "@/lib/supabase";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = createMetadata({
  title: "공지사항",
  description: "Jump English 공지사항입니다.",
});

const categoryVariant: Record<string, "default" | "secondary" | "outline"> = {
  공지: "default",
  이벤트: "secondary",
  업데이트: "outline",
};

export default async function NoticePage() {
  const supabase = createPublicClient();
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <section className="bg-muted/40 py-16">
        <Container>
          <PageHeader
            title="공지사항"
            description="Jump English의 최신 소식과 공지를 확인하세요."
          />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">구분</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-[120px] text-right">날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(notices ?? []).map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>
                    <Badge variant={categoryVariant[notice.category]}>
                      {notice.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {notice.important && (
                        <Badge variant="destructive" className="text-xs">중요</Badge>
                      )}
                      <span className="font-medium">{notice.title}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {notice.content.split("\n")[0]}
                    </p>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {notice.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </section>
    </div>
  );
}
