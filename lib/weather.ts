






const TEMP_UNIT: "celsius" | "fahrenheit" = "fahrenheit";

export type Weather = { temperature: number; code: number };

export type Location = { latitude: number; longitude: number };

export async function getWeather(location: Location): Promise<Weather | null> {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(location.latitude));
    url.searchParams.set("longitude", String(location.longitude));
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("temperature_unit", TEMP_UNIT);

    try {
        const res = await fetch(url.toString());
        if (!res.ok) return null;
        const data = await res.json();
        const cw = data?.current_weather;
        if (!cw || typeof cw.temperature !== "number") return null;
        return { temperature: cw.temperature, code: Number(cw.weathercode ?? 0) };
    } catch (e) {
        return null;
    }
}


