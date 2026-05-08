import type { Metadata } from "next";

export const siteConfig = {
  name: "Next.js Starter Kit",
  description:
    "A modern starter kit built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.",
  url: "https://example.com",
};

export function createMetadata({
  title,
  description,
}: {
  title?: string;
  description?: string;
} = {}): Metadata {
  const desc = description ?? siteConfig.description;
  return {
    title,
    description: desc,
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: desc,
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description: desc,
    },
  };
}
