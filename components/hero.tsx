import Image from "next/image"

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

export function Hero(): React.ReactElement{


    const {poster: posterSrc} = MEDIA["day"]
    return <section className="relative h-svh w-full overflow-hidden">

        {/* Background image and video */}

        <div>
            <Image
                src={posterSrc}
                alt="Herobackground"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                />
        </div>
    </section>
}