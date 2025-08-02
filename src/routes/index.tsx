import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { AboutArtist } from "@/components/AboutArtist";
import { FeaturedArtwork } from "@/components/FeaturedArtwork";
import { ArtistJourney } from "@/components/ArtistJourney";
import { WhyOriginalArt } from "@/components/WhyOriginalArt";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-blue-950/10">
      <main className="flex-1 relative overflow-hidden">
        {/* Magical floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
        </div>
        
        <HeroSection />
        <AboutArtist />
        <FeaturedArtwork />
        <ArtistJourney />
        <WhyOriginalArt />
      </main>
    </div>
  );
}
