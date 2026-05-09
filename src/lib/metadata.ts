import type { Metadata } from "next";

export const siteConfig = {
  name: "Jump English",
  description:
    "1:1 맞춤 화상영어로 자신감 있게 말하세요. 원어민 강사와 함께하는 Jump English에서 진짜 영어를 경험하세요.",
  url: "https://jump-english.co.kr",
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
