import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/artworks/$artworkId")({
  component: ArtworkDetail,
});

interface Artwork {
  id: string;
  title: string;
  cost: number;
  imageUrl: string;
  description: string;
}

const placeholderArtworks: Artwork[] = [
  {
    id: "1",
    title: "Rainbow Dreams",
    cost: 25.00,
    imageUrl: "https://picsum.photos/600/800?random=1",
    description: "A vibrant rainbow painting that captures the wonder and joy of childhood imagination."
  },
  {
    id: "2", 
    title: "Ocean Adventure",
    cost: 30.00,
    imageUrl: "https://picsum.photos/600/800?random=2",
    description: "An exciting underwater scene featuring colorful fish and marine life swimming through coral reefs."
  },
  {
    id: "3",
    title: "Sunny Day",
    cost: 20.00,
    imageUrl: "https://picsum.photos/600/800?random=3",
    description: "A cheerful landscape painting depicting a perfect sunny day with blue skies and puffy white clouds."
  },
  {
    id: "4",
    title: "Magic Forest",
    cost: 35.00,
    imageUrl: "https://picsum.photos/600/800?random=4",
    description: "An enchanted forest scene filled with mystical creatures and sparkling fairy lights among the trees."
  },
  {
    id: "5",
    title: "Space Explorer",
    cost: 40.00,
    imageUrl: "https://picsum.photos/600/800?random=5",
    description: "An adventurous space scene with rockets, planets, and astronauts exploring the vast cosmos."
  },
  {
    id: "6",
    title: "Butterfly Garden",
    cost: 28.00,
    imageUrl: "https://picsum.photos/600/800?random=6",
    description: "A beautiful garden scene filled with colorful butterflies dancing among blooming flowers."
  }
];

function ArtworkDetail() {
  const { artworkId } = Route.useParams();
  const artwork = placeholderArtworks.find(art => art.id === artworkId);

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Artwork Not Found</h1>
            <p className="text-muted-foreground mb-6">The artwork you're looking for doesn't exist.</p>
            <Link to="/browse">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleBuy = () => {
    console.log(`Buy clicked for ${artwork.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/browse">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-auto object-cover"
                />
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">{artwork.title}</h1>
              <p className="text-3xl font-bold text-primary">${artwork.cost.toFixed(2)}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{artwork.description}</p>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleBuy}
                size="lg"
                className="w-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}