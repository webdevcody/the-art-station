import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Loader2 } from "lucide-react";
import { useGetFeaturedArtworks } from "@/routes/-hooks/use-get-featured-artworks";
import { Link } from "@tanstack/react-router";

interface ArtworkProps {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageData: string | null;
  size?: "small" | "medium" | "large";
}

function ArtworkCard({
  id,
  title,
  description,
  price,
  imageData,
  size = "medium",
}: ArtworkProps) {
  const sizeClasses = {
    small: "aspect-square",
    medium: "aspect-[3/4]",
    large: "aspect-[4/5]",
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 shadow-md">
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 relative overflow-hidden`}
      >
        {imageData ? (
          <img
            src={imageData}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-2 bg-muted/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
              <p className="text-xs">No image available</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          <Badge variant="outline" className="ml-2 shrink-0">
            ${price.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {description || "A beautiful piece waiting to tell its story."}
        </p>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            Add to Cart
          </Button>
          <Button size="sm" variant="outline" className="px-3" asChild>
            <Link to="/artworks/$artworkId" params={{ artworkId: id }}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedArtwork() {
  const { data: artworks, isLoading, error } = useGetFeaturedArtworks();

  // Assign dynamic sizes for visual interest in masonry layout
  const getSizeForIndex = (index: number): "small" | "medium" | "large" => {
    const pattern = ["large", "medium", "small", "medium", "medium", "small"];
    return pattern[index % pattern.length] as "small" | "medium" | "large";
  };

  if (error) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              Unable to load featured artworks at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Art That Tells Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each piece comes with its own adventure. These aren't just paintings
            - they're glimpses into a world where anything is possible and
            everything has feelings.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              Loading beautiful artwork...
            </span>
          </div>
        ) : artworks && artworks.length > 0 ? (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {artworks.map((artwork, index) => (
                <div key={artwork.id} className="break-inside-avoid">
                  <ArtworkCard {...artwork} size={getSizeForIndex(index)} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link to="/browse">View Full Gallery</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">
              New Artwork Coming Soon!
            </h3>
            <p className="text-muted-foreground">
              Our young artist is working on her next masterpiece. Check back
              soon to see what magical creations await!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
