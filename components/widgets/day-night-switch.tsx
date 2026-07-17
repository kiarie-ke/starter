"use client"

import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

export type DayNightMode = "day" | "night"

interface Props {
    value: DayNightMode
    onChange: (mode: DayNightMode) => void
}

export function DayNightSwitch({ value, onChange }: Props): React.ReactElement {
    const isDay = value === "day"

    return (
        <button
            onClick={() => onChange(isDay ? "night" : "day")}
            aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
            className="relative flex h-16 w-8 flex-col items-center justify-between rounded-full bg-overlay-ink/80 p-1.5 backdrop-blur-[6px] transition-colors"
        >
            {/* sliding thumb */}
            <span
                className={cn(
                    "absolute left-1.5 flex size-5 items-center justify-center rounded-full bg-overlay-cream/90 text-overlay-ink transition-all duration-300",
                    isDay ? "top-1.5" : "top-[calc(100%-1.5rem)]"
                )}
            >
                {isDay ? (
                    <SunIcon size={13} weight="fill" />
                ) : (
                    <MoonIcon size={13} weight="fill" />
                )}
            </span>

            {/* faint marker for the inactive position */}
            <span
                className={cn(
                    "z-0 size-1.5 rounded-full bg-overlay-cream/30",
                    isDay ? "self-center mt-auto mb-1" : "self-center mt-1 mb-auto"
                )}
            />
        </button>
    )
}