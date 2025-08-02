import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

interface ArtworkCard {
  id: string;
  title: string;
  cost: number;
  imageUrl: string;
  description: string;
}

const placeholderArtworks: ArtworkCard[] = [
  {
    id: "1",
    title: "Rainbow Dreams",
    cost: 25.00,
    imageUrl: "https://picsum.photos/300/400?random=1",
    description: "A vibrant rainbow painting that captures the wonder and joy of childhood imagination."
  },
  {
    id: "2", 
    title: "Ocean Adventure",
    cost: 30.00,
    imageUrl: "https://picsum.photos/300/400?random=2",
    description: "An exciting underwater scene featuring colorful fish and marine life swimming through coral reefs."
  },
  {
    id: "3",
    title: "Sunny Day",
    cost: 20.00,
    imageUrl: "https://picsum.photos/300/400?random=3",
    description: "A cheerful landscape painting depicting a perfect sunny day with blue skies and puffy white clouds."
  },
  {
    id: "4",
    title: "Magic Forest",
    cost: 35.00,
    imageUrl: "https://picsum.photos/300/400?random=4",
    description: "An enchanted forest scene filled with mystical creatures and sparkling fairy lights among the trees."
  },
  {
    id: "5",
    title: "Space Explorer",
    cost: 40.00,
    imageUrl: "https://picsum.photos/300/400?random=5",
    description: "An adventurous space scene with rockets, planets, and astronauts exploring the vast cosmos."
  },
  {
    id: "6",
    title: "Butterfly Garden",
    cost: 28.00,
    imageUrl: "https://picsum.photos/300/400?random=6",
    description: "A beautiful garden scene filled with colorful butterflies dancing among blooming flowers."
  }
];

function Browse() {
  const handlePurchase = (artwork: ArtworkCard) => {
    console.log(`Purchase clicked for ${artwork.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Browse Artwork</h1>
          <p className="text-muted-foreground">Discover amazing artwork created with love and imagination</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderArtworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{artwork.title}</CardTitle>
                <p className="text-2xl font-bold text-primary">${artwork.cost.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link to="/artworks/$artworkId" params={{ artworkId: artwork.id }}>
                  <Button 
                    className="w-full"
                    variant="default"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}