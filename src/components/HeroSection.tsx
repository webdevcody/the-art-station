import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-gradient-primary to-gradient-secondary bg-clip-text text-transparent">
            Art Station
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover and purchase unique artwork from talented young artists. 
          Each piece tells a story and brings joy to your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8" asChild>
            <Link to="/browse">
              Browse Gallery
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}