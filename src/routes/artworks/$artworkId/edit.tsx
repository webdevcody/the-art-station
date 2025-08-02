import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGetArtworkById } from "../../-hooks/use-get-artwork-by-id";
import { EditArtworkForm } from "../../admin/-components/EditArtworkForm";
import { authClient } from "~/lib/auth-client";
import { isAdminFn } from "~/routes/-hooks/use-is-admin";

export const Route = createFileRoute("/artworks/$artworkId/edit")({
  component: EditArtwork,
  beforeLoad: async () => {
    const isAdmin = await isAdminFn();
    if (!isAdmin) {
      throw redirect({
        to: "/unauthorized",
      });
    }
  },
});

function EditArtwork() {
  const { artworkId } = Route.useParams();
  const { data: artwork, isLoading, error } = useGetArtworkById(artworkId);
  const { data: sessionData } = authClient.useSession();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/artworks/$artworkId" params={{ artworkId }}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Artwork
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Edit Artwork
          </h1>
          <p className="text-muted-foreground">
            Update the details for "{artwork.title}"
          </p>
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
              <h2 className="text-xl font-semibold mb-2 text-foreground">
                Current Details
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Title:</strong> {artwork.title}
                </p>
                <p>
                  <strong>Price:</strong> ${artwork.price.toFixed(2)}
                </p>
                <p>
                  <strong>For Sale:</strong> {artwork.isForSale ? "Yes" : "No"}
                </p>
                {artwork.description && (
                  <p>
                    <strong>Description:</strong> {artwork.description}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Edit Form
              </h2>
              <EditArtworkForm artwork={artwork}>
                <Button className="w-full">Open Edit Form</Button>
              </EditArtworkForm>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
