"use client";

import Link from "next/link";
import {
  Code,
  Moon,
  Smartphone,
  Layers,
  Zap,
  Palette,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/container";

const features = [
  {
    icon: Code,
    title: "TypeScript",
    description: "Full type safety with TypeScript and strict mode enabled.",
    badge: "Language",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Light, dark, and system theme powered by next-themes.",
    badge: "Theme",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first responsive layout with adaptive navigation.",
    badge: "Layout",
  },
  {
    icon: Layers,
    title: "Modern Stack",
    description: "Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui v4.",
    badge: "Framework",
  },
  {
    icon: ShieldCheck,
    title: "Form Validation",
    description: "react-hook-form + zod for type-safe form handling.",
    badge: "Forms",
  },
  {
    icon: Zap,
    title: "Fast Builds",
    description: "Turbopack-powered dev server for instant feedback.",
    badge: "Performance",
  },
  {
    icon: Palette,
    title: "Themeable UI",
    description: "30+ shadcn/ui components with oklch color system.",
    badge: "Design",
  },
  {
    icon: FileText,
    title: "SEO Ready",
    description: "Metadata utilities with OpenGraph and Twitter card support.",
    badge: "SEO",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-4 pt-24 pb-16 text-center">
        <Badge variant="secondary" className="text-sm">
          Next.js 16 + React 19
        </Badge>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Build faster with a modern starter kit
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          A production-ready template with dark mode, form validation,
          responsive navigation, error handling, and all the essentials
          pre-configured.
        </p>
        <div className="flex gap-3 pt-2">
          <Link href="/about" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Features */}
      <Container className="pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className="size-5 text-muted-foreground" />
                  <Badge variant="outline">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <section className="flex flex-col items-center gap-4 px-4 pb-24">
        <p className="text-sm text-muted-foreground">
          Try the toast notification system
        </p>
        <Button
          size="lg"
          variant="outline"
          onClick={() =>
            toast.success("Welcome!", {
              description: "Your starter kit is ready to go.",
            })
          }
        >
          Show Toast
        </Button>
      </section>
    </div>
  );
}
