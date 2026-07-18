"use client";

import { PRACTICE_AREAS } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/reveal";

export function PracticeStripe(): React.ReactElement {
  return (
    <section className="border-y border-hairline py-9">
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10">
        <RevealGroup as="ul" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0">
          {PRACTICE_AREAS.map((entry, index) => (
            <RevealItem
              key={index}
              as="li"
              className="flex flex-col gap-1.5 px-0 lg:px-5
                lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-hairline"
            >
              <span className="text-muted-ink uppercase eyebrow">{entry.k}</span>
              <span className="text-sm font-medium tracking-[-0.01em] text-ink">{entry.v}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}