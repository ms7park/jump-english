"use client";

import { useState } from "react";
import type { DbFaq } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqCategories = ["수업", "결제", "기술", "기타"] as const;

export function FaqList({ faqs }: { faqs: DbFaq[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("수업");

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="mb-0">
      <div className="mb-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {faqCategories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {filtered.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          해당 카테고리의 FAQ가 없습니다.
        </div>
      )}
    </div>
  );
}
