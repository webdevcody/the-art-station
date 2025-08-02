import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useCreateCheckoutSession } from "./-hooks/use-create-checkout-session";
import { useCheckCartAvailability } from "./-hooks/use-check-cart-availability";
import { Trash2, ShoppingCart, CreditCard, AlertTriangle, Heart, Sparkles, Star, Gift, Palette } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useCart();
  const queryClient = useQueryClient();

  const createCheckoutSession = useCreateCheckoutSession({
    onArtworkSoldOut: (soldOutItems) => {
      queryClient.invalidateQueries({ queryKey: ["cart-availability"] });
    },
  });

  const { data: availabilityData, isLoading: isCheckingAvailability } =
    useCheckCartAvailability(cart.items);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-8">
              <div className="relative flex justify-center">
                <ShoppingCart className="h-24 w-24 text-purple-400 animate-pulse" />
                <Heart className="h-8 w-8 text-pink-400 absolute -top-2 -right-2 animate-bounce" />
                <Sparkles className="h-6 w-6 text-yellow-400 absolute -bottom-2 -left-2 animate-pulse delay-150" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Your Treasure Cart is Empty!
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                  Ready to discover some amazing artwork? Addie's gallery is full of 
                  magical creations waiting to find their new home! ✨
                </p>
              </div>
              
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                <a href="/browse">
                  <Palette className="w-5 h-5 mr-2" />
                  Explore the Gallery
                  <Sparkles className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="h-12 w-12 text-purple-500" />
                <Heart className="h-6 w-6 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Your Art Collection
                </h1>
                <p className="text-muted-foreground text-lg">
                  Ready to take home these amazing treasures! 🎨
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border-red-200 dark:border-red-800 backdrop-blur-sm transition-all duration-300 text-red-600 dark:text-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Start Fresh
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => {
                const isUnavailable = availabilityData?.unavailableItems.some(
                  (unavailableItem) =>
                    unavailableItem.artworkId === item.artworkId
                );

                return (
                  <Card
                    key={item.id}
                    className={`${
                      isUnavailable 
                        ? "border-red-300 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800" 
                        : "border-2 border-purple-200/50 dark:border-purple-800/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                    }`}
                  >
                    <CardContent className="p-6">
                      {isUnavailable && (
                        <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 rounded-xl border border-red-200 dark:border-red-800">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 animate-pulse" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">
                            Oh no! This masterpiece has found another home 💔
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl overflow-hidden flex-shrink-0 border-2 border-purple-200/50 dark:border-purple-800/30">
                            {item.imageData ? (
                              <img
                                src={item.imageData}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Palette className="h-8 w-8 text-purple-400" />
                              </div>
                            )}
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-1">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                            <h3 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {item.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                            <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ✨ ${item.price.toFixed(2)} for this unique treasure
                          </p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.artworkId)}
                            className="bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 backdrop-blur-sm transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Price per item:
                          </span>
                          <span className="font-semibold">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-muted-foreground">
                            Total:
                          </span>
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-2 border-purple-200/50 dark:border-purple-800/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-xl sticky top-8">
                <CardHeader className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <Gift className="h-6 w-6 text-purple-500" />
                    <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Your Treasures
                    </CardTitle>
                    <Sparkles className="h-5 w-5 text-pink-500 animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCheckingAvailability && (
                    <div className="flex items-center gap-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        Checking item availability...
                      </span>
                    </div>
                  )}
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                  {(availabilityData?.unavailableItems.length ?? 0) > 0 && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-md mb-4">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-sm text-yellow-700 dark:text-yellow-300">
                        Please remove unavailable items before proceeding to
                        checkout
                      </span>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      // Only proceed if availability check is complete and all items are available
                      if (isCheckingAvailability) {
                        return; // Don't proceed if still checking
                      }

                      if (
                        (availabilityData?.unavailableItems.length ?? 0) > 0
                      ) {
                        return; // Don't proceed if there are unavailable items
                      }

                      createCheckoutSession.mutate(cart.items);
                    }}
                    disabled={
                      createCheckoutSession.isPending ||
                      isCheckingAvailability ||
                      (availabilityData?.unavailableItems.length ?? 0) > 0
                    }
                  >
                    {createCheckoutSession.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating checkout session...
                      </>
                    ) : isCheckingAvailability ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying availability...
                      </>
                    ) : (availabilityData?.unavailableItems.length ?? 0) > 0 ? (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Remove unavailable items
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                  {/* Error handling is now done via toast notifications */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
