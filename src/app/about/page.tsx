import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata = createMetadata({ title: "About" });

const techStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui v4",
  "react-hook-form",
  "zod",
  "lucide-react",
  "next-themes",
  "Turbopack",
];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <PageHeader
        title="About"
        description="This starter kit provides a solid foundation for building modern web applications with Next.js 16."
      />

      <p className="mt-6 max-w-2xl text-muted-foreground">
        It includes pre-configured dark mode, responsive navigation, form
        validation, error handling, SEO utilities, and a curated set of UI
        components — everything you need to start building right away.
      </p>

      <Separator className="my-8" />

      <h2 className="text-xl font-semibold">Tech Stack</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className="text-xl font-semibold">Getting Started</h2>
      <p className="mt-4 text-muted-foreground">
        Edit the pages in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          src/app/
        </code>{" "}
        to start building your application. Add new shadcn/ui components with{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          npx shadcn@latest add
        </code>
        .
      </p>
    </Container>
  );
}
