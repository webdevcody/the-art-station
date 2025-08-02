import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Edit, ShoppingCart, Heart, Sparkles, Star, Palette } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { useGetArtworkById } from "~/routes/-hooks/use-get-artwork-by-id";
import { useCart } from "@/contexts/CartContext";

export const Route = createFileRoute("/artworks/$artworkId/")({
  component: ArtworkDetail,
});

function ArtworkDetail() {
  const { artworkId } = Route.useParams();
  const { data: artwork, isLoading, error } = useGetArtworkById(artworkId);
  const { data: sessionData } = authClient.useSession();
  const { addToCart, getItemQuantity } = useCart();

  // Check if user is admin
  const isAdmin = sessionData?.user && (sessionData.user as any).isAdmin;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64 space-y-6">
            <div className="relative">
              <Palette className="h-12 w-12 text-purple-500 animate-spin" />
              <Sparkles className="h-6 w-6 text-pink-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <p className="text-muted-foreground text-lg text-center">
              Preparing Addie's masterpiece for you... ✨
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-red-400" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're having trouble showing you this beautiful artwork right now. 
                Let's get you back to the gallery! 🎨
              </p>
              <p className="text-sm text-muted-foreground">
                {error.message}
              </p>
            </div>
            <Link to="/browse">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to the Gallery
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center relative">
              <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
              <Star className="h-8 w-8 text-yellow-400 absolute -top-2 -left-2 animate-bounce" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                This Masterpiece is Missing!
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                It looks like this artwork has gone on an adventure! 
                Let's explore the other amazing creations in the gallery. ✨
              </p>
            </div>
            <Link to="/browse">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Explore the Gallery
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/browse">
            <Button className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-purple-200 dark:border-purple-800 backdrop-blur-sm transition-all duration-300" variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <Sparkles className="w-4 h-4 mr-1" />
              Back to Gallery
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <Card className="overflow-hidden border-4 border-purple-200/50 dark:border-purple-800/30 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
              <CardHeader className="p-0 relative">
                <div className="w-full h-96 bg-gradient-to-br from-pink-100/50 to-purple-100/50 dark:from-pink-900/20 dark:to-purple-900/20 relative overflow-hidden">
                  {artwork.imageData ? (
                    <img
                      src={artwork.imageData}
                      alt={artwork.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Palette className="h-16 w-16 text-purple-400 mx-auto animate-pulse" />
                        <p className="text-muted-foreground">
                          This masterpiece is being prepared! ✨
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Magical decorative elements */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            {/* Floating decorative elements around the image */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-4 shadow-lg animate-bounce">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-4 shadow-lg animate-bounce delay-150">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="space-y-8">
            {/* Title and Price Section */}
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {artwork.title}
                </h1>
                <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 text-center lg:text-left">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ${artwork.price.toFixed(2)}
                </p>
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200/30 dark:border-purple-800/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About This Masterpiece
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {artwork.description || "This beautiful creation speaks for itself - a true work of art from Addie's imagination! Every stroke tells a story of creativity and wonder. ✨"}
              </p>
            </div>

            {/* Action Buttons */}
            {isAdmin ? (
              <div className="pt-6">
                <Link
                  to="/artworks/$artworkId/edit"
                  params={{ artworkId }}
                  search={{ from: "detail" }}
                >
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    <Sparkles className="w-4 h-4 mr-1" />
                    Edit This Masterpiece
                  </Button>
                </Link>
              </div>
            ) : artwork.isForSale ? (
              <div className="pt-6 space-y-4">
                <Button
                  onClick={() => addToCart(artwork)}
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  disabled={getItemQuantity(artwork.id) > 0}
                >
                  {getItemQuantity(artwork.id) > 0 ? (
                    <>
                      <Heart className="w-5 h-5 mr-2 fill-current animate-pulse" />
                      This Treasure is in Your Cart!
                      <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Take This Masterpiece Home
                      <Star className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                {getItemQuantity(artwork.id) > 0 && (
                  <div className="text-center bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
                    <p className="text-green-700 dark:text-green-300 font-semibold text-lg">
                      🎉 Ready for checkout! This amazing artwork is waiting for you!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-6">
                <Button 
                  disabled 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0 shadow-lg opacity-60"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  This Masterpiece is Not For Sale
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-center text-muted-foreground mt-3 text-sm">
                  This special piece is part of Addie's personal collection ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
