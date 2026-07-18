"use client"
import { Project, PROJECTS } from "@/lib/content";
import { div, li } from "motion/react-client";
import { Card } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

function ProjectCard({
    project
}: {
    project: Project
}): React.ReactElement {
    return <div className="[grid-are:1/1]">
        <Card>
            <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
                <div className="aspect-square relative overflow-hidden border-b border-hairline md:border-r md:border-b-0">
                    <Image src={project.image} alt={project.imageAlt} fill className="object-cover" />

                </div>
                <div>
                    <div>
                        <span>/ {project.index}</span>
                        <span>{project.year}</span>


                    </div>
                    <h3>
                        {project.title}

                    </h3>

                    <p>
                        {project.description}
                    </p>

                    <div>
                        {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                    </div>

                    <div>
                        <Link href={project.href}>View case Study <ArrowUpRightIcon size={14} weight="bold" />  </Link>

                        <span>{project.status}</span>

                    </div>



                </div>

            </div>
        </Card>
    </div>
}

export function SelectedWork(): React.ReactElement {

    return (
        <section
            id="work"
            className="relative border-t bg-hairline-soft"
        >
            <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 pt-20 sm:pt-28">

                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="eyebrow text-muted-ink">01</span>
                        <span className="eyebrow text-ink uppercase">Selected Work</span>
                    </div>


                    <span className="font-mono text-[11px] tracking-[0.1em] text-muted-ink uppercase">2024-2026</span>
                </div>


                <h2 className="mt-10 max-w-[20ch] text-[clamp(2rem,4.4vw,2.75rem)] tracking-[-0.025em]">
                    A focused set of recent AI products and systems, each shipped to real users.
                </h2>

            </div>


            <div className="pt-12 pb-20 sm:pb-28">

                <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10">


                    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8">

                        <nav className="flex flex-col lg:col-span-3 lg:col-start-1 lg:row-start-1">
                            <ol className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 lg:snap-none lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                                {
                                    PROJECTS.map((project, index) => {

                                        return <li key={project.title} className="snap-center">


                                            <button className="relative flex items-center gap-3 py-2 text-left whitespace-nowrap lg:w-full lg:whitespace-normal">
                                                <span className="grid shrink-0 place-items-center font-mono text-[11px] tracking-[0.12em] text-muted-soft tabular-nums">
                                                    {project.index}
                                                </span>
                                                <span className="text-[14px] leading-snug transition-colors text-muted-ink">{project.title}</span>
                                            </button>

                                        </li>

                                    })
                                }
                            </ol>
                        </nav>

                        {/* projects card */}
                        <div className="relative isolate grid lg:col-span-8 lg:col-start-4 lg:row-start-1 lg:mt-2">
                            {PROJECTS.map((project, index) => (
                                <ProjectCard

                                    key={project.title}
                                    project={project} />
                            ))
                            }
                        </div>




                    </div>


                </div>


            </div>

        </section>
    )
}