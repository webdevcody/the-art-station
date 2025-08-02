import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useCreateCheckoutSession } from "./-hooks/use-create-checkout-session";
import { useCheckCartAvailability } from "./-hooks/use-check-cart-availability";
import { Trash2, ShoppingCart, CreditCard, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any artwork to your cart yet.
              </p>
              <Button asChild>
                <a href="/browse">Browse Artwork</a>
              </Button>
            </div>
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive"
            >
              Clear Cart
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
                    className={`${isUnavailable ? "border-red-500 bg-red-50 dark:bg-red-950/20" : ""}`}
                  >
                    <CardContent className="p-4">
                      {isUnavailable && (
                        <div className="flex items-center gap-2 mb-3 p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">
                            This item is no longer available
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {item.imageData ? (
                            <img
                              src={item.imageData}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No img
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-2xl font-bold text-gradient-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.artworkId)}
                            className="text-destructive"
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
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
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
      <Footer />
    </div>
  );
}
