"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { DayNightMode, DayNightSwitch } from "./widgets/day-night-switch"
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr"
import { Geolocation } from "@/lib/location"
import { Weather } from "@/lib/weather"
import { LiveLocator } from "./widgets/live-locator"


type HeroProps = {
    location: Geolocation,
    weather: Weather | null
}
const MEDIA: Record< DayNightMode, {poster: string, video: string}> = {
    day: {
        poster: "/assets/hero-day-poster.webp",
        video: "/assets/hero-background-video.mp4",
    },
    night: {
        poster: "/assets/hero-night-poster.webp",
        video: "/assets/hero-night-video.mp4",
    },
}


export function Hero({location, weather}: HeroProps ): React.ReactElement {

const [mode, setMode] = useState<DayNightMode>("day");
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null)


    const { poster: posterSrc, video: videoSrc } = MEDIA[mode]
    return <section className="relative  isolate h-svh w-full overflow-hidden text-overlay-cream bg-overlay-ink">

        {/* Background image and video */}

        <div className="absolute inset-0 -z-20">



            <video
                ref={videoRef}

                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={posterSrc}

                className="h-full w-full object-cover sm:object-center"
                onCanPlay={() => setVideoReady(true)}
            />

            <Image
                src={posterSrc}
                alt="Herobackground"
                fill
                priority
                sizes="100vw"
                className={
                    cn("object-cover transition-opacity duration-[900ms] ease-out",
                        videoReady ? "opacity-0" : "opacity-100"
                    )
                }
            />
        </div>
        {/* overlay */}
        <div
            className="absolute inset-0 -z-10"
            style={{
                background:
                    "linear-gradient(108deg, rgba(15,15,12,0.78) 0%, rgba(15,15,12,0.58) 22%, rgba(15,15,12,0.32) 46%, rgba(15,15,12,0.32) 68%, rgba(15,15,12,0.32) 84%)",
            }}
        />



        <div
            className="absolute inset-x-0 top-0 h-32 -z-10"
            style={{
                background:
                    "linear-gradient(to_bottom, rgba(15,15,12,0.55) 0%, rgba(15,15,12,0.10) 22%, rgba(15,15,12,0.32) 46%, rgba(15,15,12,0.32) 100%,)",
            }}
        />

        {/* forground */}
        <div className="relative z-10 flex h-full flex-col">
            <div className="h-16 shrink-0 sm:h-20 " />

            <div className="flex flex-1 items-center">

                <div className="mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14 ">

                    <div className="max-w-[640px]">

                        <p className=" caption-uppercase text-overlay-cream/70">
                            Full-stack AI First Engineer
                        </p>
                        <h1 className="mt-5 leading-[1.04] tracking-[-0.03em] text-[clamp(2.25rem,4.8vw,4.25rem)]"
                        // Text wont be smaller than 2.25rem, it wont be bigger than 4.25 and in between it scales based on the screen width4.5%


                        >
                            Modern Software <br />
                            built to think,
                            <br />
                            shiped end to end
                        </h1>
                        <p className="mt-5 max-w-[560px] text-base text-overlay-cream/80 leading-[1.6]">
                            I'm Kenneth, a full-stack engineer with a passion for building modern software that leverages AI to solve real-world problems. I specialize in creating end-to-end solutions that are both scalable and efficient.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-10">
                            <Button
                                asChild
                                className="h-11 rounded-md px-5 text-sm font-medium hover:bg bg-primary-active focus-visible:ring-primary/40"
                            >
                                <Link href="#work"> View Selected Work <ArrowUpRightIcon size={16} weight="bold" /></Link>
                            </Button>

                            <Button
                                asChild
                                variant={"ghost"}
                                className="h-11 rounded-md px-5 text-sm font-medium hover:bg-overlay-cream/15 bg-primary-active hover:text-overlay-cream
                                border-overlay-cream/25 bg-overlay-cream/[0.06]
                                backdrop-blur-[2px]"
                            >
                                <Link href="#contact"> Get In Touch  </Link>
                            </Button>
                        </div>


                    </div>

                </div>

                <div className="absolute top-1/4 right-6 z-20 -translate-1/2 sm:right-10 lg:right-14">
                    <DayNightSwitch value={mode} onChange={setMode}/>
                </div>


               


                    </div>

                     {/* bottom Strip */}
                <div className="shrink-0 pb-7 sm:pb-9">

                    {/* left label, scroll text,temp,clock,location */}

                    <div className="mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14 flex flex-col items-start sm:flex-row sm:justify-between gap-3 sm:gap-4">

                        <p className="inline-flex items-center gap-2 rounded-full border border-overlay-cream/20 bg-overlay-ink/40 px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-overlay-cream/85 backdrop-blur-[2px]">
                            <span className="relative inline-flex size-1.5">
                                <span className="absolute inline-flex h-full animate-ping rounded-full bg-success/70 opacity-75"/>
                                <span className="relative inline-flex size-1.5 rounded-full bg-success"/>
                            </span>
                           Available for new work. Q3 2026
                        </p>

                        <div className="flex items-center gap-1 text-overlay-cream/70">
                            <span className="flex items-center gap-3">
                                <ArrowDownIcon size={14} weight="regular"/>
                               <span className="caption-uppercase">Scroll</span> 

                               <span className="h-px w-10 bg-overlay-cream/25"/>
                            </span>
                           <LiveLocator location={location} weather={weather} />


                        </div>

                </div>


            </div>

        </div>
    </section>
}