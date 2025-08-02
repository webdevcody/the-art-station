import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutArtist } from "@/components/AboutArtist";
import { FeaturedArtwork } from "@/components/FeaturedArtwork";
import { ArtistJourney } from "@/components/ArtistJourney";
import { WhyOriginalArt } from "@/components/WhyOriginalArt";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutArtist />
        <FeaturedArtwork />
        <ArtistJourney />
        <WhyOriginalArt />
      </main>
      <Footer />
    </div>
  );
}
