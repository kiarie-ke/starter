"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

const MEDIA = {
    day: {
        poster: "/assets/hero-day-poster.webp",
        video: "/assets/hero-background-video.mp4",
    },
    night: {
        poster: "/assets/hero-night-poster.webp",
        video: "/assets/hero-night-video.mp4",
    },
}

export function Hero(): React.ReactElement {


    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null)


    const { poster: posterSrc, video: videoSrc } = MEDIA["day"]
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

            </div>

        </div>
    </section>
}