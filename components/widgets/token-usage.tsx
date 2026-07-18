"use client";
// This runs in the browser, not on the server. Required because
// useState and framer-motion both need client-side rendering.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GaugeIcon, XIcon, SquareIcon } from "@phosphor-icons/react";

// Shape of a single row of usage data.
type UsageRow = {
  model: string;
  vendor: string;
  tokens: number;
  costUsd: number;
};

// Static data source for the card. Swap this for a prop or a fetch
// call later if the numbers need to come from an API.
export const TOKEN_USAGE: UsageRow[] = [
  { model: "Opus 4.7", vendor: "Anthropic", tokens: 8_230_000, costUsd: 211 },
  { model: "Sonnet 4.6", vendor: "Anthropic", tokens: 2_400_000, costUsd: 42 },
  { model: "Haiku 4.5", vendor: "Anthropic", tokens: 1_140_000, costUsd: 19 },
  { model: "GPT-5", vendor: "OpenAI", tokens: 730_000, costUsd: 12 },
];

// Turns a raw token count into a short label.
// 8230000 becomes "8.2M", 730000 becomes "730K".
function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(0)}K`;
  return `${tokens}`;
}

// Turns a raw cost number into a dollar string with commas.
// 211 becomes "$211", 1200 becomes "$1,200".
function formatCost(costUsd: number): string {
  return `$${costUsd.toLocaleString()}`;
}

export function TokenUsage(): React.ReactElement {
  // Tracks whether the detail section is hidden.
  // false = expanded, true = collapsed.
  const [collapsed, setCollapsed] = useState(false);

  // Highest token count in the list. Used to scale each bar
  // relative to the biggest spender, so Opus 4.7 fills 100 percent
  // and the rest sit proportionally under it.
  const maxTokens = Math.max(...TOKEN_USAGE.map((row) => row.tokens));

  // Sum of every row's cost, shown at the bottom of the card.
  const totalCost = TOKEN_USAGE.reduce((sum, row) => sum + row.costUsd, 0);

  return (
    <aside className="w-[280px] overflow-hidden rounded-xl border border-overlay-cream/15 bg-overlay-ink/55 p-5 text-overlay-cream shadow-sm backdrop-blur-[10px]">
      
      {/* Header row: title on the left, toggle icon on the right.
          Both are buttons so clicking either one collapses or expands. */}
      <div className="flex min-w-0 items-center justify-between gap-3 whitespace-nowrap">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="caption-uppercase inline-flex min-w-0 items-center gap-2 rounded-full text-overlay-cream/80 transition-colors hover:text-overlay-cream focus-visible:ring-2"
        >
          <GaugeIcon size={14} weight="regular" className="shrink-0 text-overlay-cream/60" />
          <span className="truncate">Token Usage</span>
          <span className="text-overlay-cream/70">&middot; 28 days</span>
        </button>

        {/* Icon toggle button. Shows X when open, Square when collapsed. */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-full text-overlay-cream/55 hover:bg-overlay-cream/10 hover:text-overlay-cream"
        >
          {/* AnimatePresence lets one icon animate out while the other
              animates in, instead of an instant swap.
              mode="wait" makes the exit finish before the enter starts. */}
          <AnimatePresence mode="wait" initial={false}>
            {collapsed ? (
              <motion.span
                key="square"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <SquareIcon size={13} weight="bold" />
              </motion.span>
            ) : (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <XIcon size={13} weight="bold" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Detail section. AnimatePresence here handles the mount and
          unmount animation of the entire block below the header. */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-overlay-cream/12 pt-4">
              
              {/* One row per model. Each row fades up on its own delay,
                  so the list builds top to bottom instead of appearing
                  all at once. */}
              <ul className="flex flex-col gap-3">
                {TOKEN_USAGE.map((row, index) => (
                  <motion.li
                    key={row.model}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className="flex flex-col gap-1.5"
                  >
                    {/* Model name, vendor, and cost on one line. */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <span className="truncate font-medium text-overlay-cream">{row.model}</span>
                        <span className="shrink-0 text-overlay-cream/50">{row.vendor}</span>
                      </div>
                      <span className="shrink-0 tabular-nums text-overlay-cream/70">{formatCost(row.costUsd)}</span>
                    </div>

                    {/* Usage bar and token label. The bar width animates
                        from 0 to its final percentage, timed to start
                        right after the row itself fades in. */}
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-overlay-cream/10">
                        <motion.div
                          className="h-full rounded-full bg-overlay-cream/60"
                          initial={{ width: 0 }}
                          animate={{ width: `${(row.tokens / maxTokens) * 100}%` }}
                          transition={{ duration: 0.4, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-xs tabular-nums text-overlay-cream/50">
                        {formatTokens(row.tokens)}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Total spend footer, static, no animation needed here. */}
              <div className="mt-4 flex items-center justify-between border-t border-overlay-cream/12 pt-3 text-xs">
                <span className="text-overlay-cream/60">Total spend</span>
                <span className="font-medium tabular-nums text-overlay-cream">{formatCost(totalCost)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}