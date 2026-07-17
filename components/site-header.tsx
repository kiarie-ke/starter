import { NAV_LINKS } from "@/lib/content";
import Link from "next/link";

export function SiteHeader(): React.ReactElement {


    return <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300">



        <div className="mx-auto w-full h-16 sm:h-20 max-w-[1480px] px-6 sm:px-10 lg:px-14 items-center justify-between flex">

            <Link href="/" className="group inline-flex items-center gap-1.5 text-base font-medium tracking-[-0.01em] text-overlay-cream">

                <span>Kenneth</span>
                <span className="size-1.5 rounded-full bg-primary" />

            </Link>


            <nav className="flex items-center gap-8 text-[13px] font-medium text-overlay-cream/95">
                {

                    NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href}

                            className="relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-overlay-cream/95 after:transition-transform after:duration-300 hover:text-overlay-cream/100 hover:after:scale-x-100"
                        >
                            {link.label}
                        </Link>
                    ))

                }
            </nav>

           <div className="flex gap-3">
    <Link
        href="#contact"
        className="hidden h-9 items-center gap-2 rounded-full border border-overlay-cream/55 px-4 text-[13px] text-overlay-cream backdrop-blur-[6px] transition-colors hover:bg-overlay-ink/70 md:inline-flex"
    >
        <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-success" />
            Let's Talk
        </span>
    </Link>
</div>


        </div>





    </header>
}