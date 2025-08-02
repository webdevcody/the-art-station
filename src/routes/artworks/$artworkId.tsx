import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { useGetArtworkById } from "../-hooks/use-get-artwork-by-id";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/artworks/$artworkId")({
  component: ArtworkDetail,
});

function ArtworkDetail() {
  const { artworkId } = Route.useParams();
  const { data: artwork, isLoading, error } = useGetArtworkById(artworkId);
  const { data: sessionData } = authClient.useSession();

  // Check if user is admin
  const isAdmin = sessionData?.user && (sessionData.user as any).isAdmin;

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
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
              Error Loading Artwork
            </h1>
            <p className="text-muted-foreground mb-6">
              There was an error loading the artwork: {error.message}
            </p>
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

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
              Artwork Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The artwork you're looking for doesn't exist.
            </p>
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
                <div className="w-full h-96 bg-muted relative overflow-hidden">
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
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-foreground">
                {artwork.title}
              </h1>
              <p className="text-3xl font-bold text-primary">
                ${artwork.price.toFixed(2)}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description || "No description available."}
              </p>
            </div>

            {isAdmin ? (
              <div className="pt-4">
                <Link to="/artworks/$artworkId/edit" params={{ artworkId }}>
                  <Button size="lg" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Artwork
                  </Button>
                </Link>
              </div>
            ) : artwork.isForSale ? (
              <div className="pt-4 space-y-3">
                <Button
                  onClick={handleBuy}
                  size="lg"
                  className="w-full"
                  variant="outline"
                >
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="pt-4">
                <Button disabled size="lg" className="w-full" variant="outline">
                  Not Available for Sale
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
