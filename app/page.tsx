import { Hero } from "@/components/hero";
import { PracticeStripe } from "@/components/practice-strip";
import { SelectedWork } from "@/components/selected-work";
import { getLocation } from "@/lib/location";
import { getWeather } from "@/lib/weather";
// We'll replace this piece by piece as we build each section in the video.
export default async function HomePage() {


  const location = await getLocation();
  const weather = await getWeather(location);
  
  return (
    <main className="relative">
     <Hero location={location} weather={weather}/>
     <PracticeStripe />
     <SelectedWork />
    </main>
  )
}
