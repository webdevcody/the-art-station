import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetArtworks } from "./-hooks/use-get-artworks";
import { useCart } from "@/contexts/CartContext";
import { authClient } from "@/lib/auth-client";
import { ShoppingCart, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/browse")({
  component: Browse,
});

function Browse() {
  const { data: artworks, isLoading, error } = useGetArtworks();
  const { addToCart, getItemQuantity } = useCart();
  const { data: sessionData } = authClient.useSession();
  const isAdmin = sessionData?.user && (sessionData.user as any).isAdmin;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-blue-950/10">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
            <p className="text-muted-foreground text-lg">Getting Addie's amazing artwork ready...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-blue-950/10">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <Heart className="h-8 w-8 text-red-400" />
            <p className="text-destructive text-center">
              Oops! We're having trouble loading Addie's artwork right now.<br />
              <span className="text-sm text-muted-foreground">{error.message}</span>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/30 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-blue-950/10">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Addie's Art Gallery
            </h1>
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to a magical world of creativity! Each piece is lovingly crafted by Addie, 
            a young artist with a big imagination. Every artwork tells a special story and 
            brings joy to those who see it. ✨
          </p>
        </div>

        {artworks &&
        artworks.filter((artwork) => artwork.isForSale && !artwork.isSold)
          .length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks
              .filter((artwork) => artwork.isForSale && !artwork.isSold)
              .map((artwork) => (
                <Card
                  key={artwork.id}
                  className="overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-purple-100 dark:border-purple-900/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                >
                  <CardHeader className="p-0 relative">
                    <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 relative overflow-hidden rounded-t-lg">
                      {artwork.imageData ? (
                        <img
                          src={artwork.imageData}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <Sparkles className="h-12 w-12 text-purple-400 mx-auto" />
                            <p className="text-muted-foreground text-sm">
                              Artwork coming soon!
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {artwork.title}
                    </CardTitle>
                    {artwork.description && (
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">
                        {artwork.description}
                      </p>
                    )}
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                        ${artwork.price.toFixed(2)}
                      </p>
                      <Sparkles className="h-5 w-5 text-purple-500" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-2 space-y-3">
                    <div className="flex flex-col space-y-2 w-full">
                      <Link
                        to="/artworks/$artworkId"
                        params={{ artworkId: artwork.id }}
                        className="w-full"
                      >
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                          <Sparkles className="h-4 w-4 mr-2" />
                          See This Masterpiece
                        </Button>
                      </Link>
                      {!isAdmin && (
                        <Button
                          onClick={() => addToCart(artwork)}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                          size="lg"
                          disabled={getItemQuantity(artwork.id) > 0}
                        >
                          {getItemQuantity(artwork.id) > 0 ? (
                            <>
                              <Heart className="h-4 w-4 mr-2 fill-current" />
                              Added to Cart!
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Take This Home
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-64 space-y-6 text-center">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
              <Heart className="h-8 w-8 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-muted-foreground">
                Addie is working on something amazing!
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back soon to see new masterpieces from our talented young artist. 
                Every creation is a labor of love! 🎨
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
