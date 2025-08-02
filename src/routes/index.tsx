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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <AboutArtist />
        <FeaturedArtwork />
        <ArtistJourney />
        <WhyOriginalArt />
      </main>
    </div>
  );
}
