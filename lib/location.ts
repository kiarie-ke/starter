
import { headers } from "next/headers"
export type Geolocation = {
    city: string
    region: string
    latitude: number
    longitude: number
    timezone: string
}

const DEV_LOCATION: Geolocation = {
    city: "Nairobi",
    region: "Nairobi County",
    latitude: -1.286389,
    longitude: 36.817223,
    timezone: "Africa/Nairobi",
}

export async function getLocation(): Promise<Geolocation> {
    if (process.env.NODE_ENV === "development") {
        return DEV_LOCATION
    }

    const headersList = await headers()

    return {
        city: headersList.get("x-vercel-ip-city") ?? "Unknown",
        region: headersList.get("x-vercel-ip-country-region") ?? "Unknown",
        latitude: Number(headersList.get("x-vercel-ip-latitude")) || 0,
        longitude: Number(headersList.get("x-vercel-ip-longitude")) || 0,
        timezone: headersList.get("x-vercel-ip-timezone") ?? "UTC",
    }
}