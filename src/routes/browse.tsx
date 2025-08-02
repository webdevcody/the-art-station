import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetArtworks } from "./-hooks/use-get-artworks";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

function Browse() {
  const { data: artworks, isLoading, error } = useGetArtworks();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading artwork...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-destructive">
              Error loading artwork: {error.message}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Browse Artwork
          </h1>
          <p className="text-muted-foreground">
            Discover amazing artwork created with love and imagination
          </p>
        </div>

        {artworks &&
        artworks.filter((artwork) => artwork.isForSale).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks
              .filter((artwork) => artwork.isForSale)
              .map((artwork) => (
                <Card
                  key={artwork.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-0">
                    <div className="w-full h-64 bg-muted relative overflow-hidden">
                      {artwork.imageData ? (
                        <img
                          src={artwork.imageData}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                          <p className="text-muted-foreground">
                            No image available
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">
                      {artwork.title}
                    </CardTitle>
                    {artwork.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {artwork.description}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-primary">
                      ${artwork.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 space-y-2">
                    <Link
                      to="/artworks/$artworkId"
                      params={{ artworkId: artwork.id }}
                    >
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                    <AddToCartButton artwork={artwork} className="w-full" />
                  </CardFooter>
                </Card>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">No artwork available yet.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
