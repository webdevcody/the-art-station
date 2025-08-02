import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../-fn/create-checkout-session";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

interface UseCreateCheckoutSessionOptions {
  onArtworkSoldOut?: (soldOutItems: CartItem[]) => void;
}

export function useCreateCheckoutSession(
  options: UseCreateCheckoutSessionOptions = {}
) {
  return useMutation({
    mutationFn: async (items: CartItem[]) => {
      const result = await createCheckoutSession({ data: { items } });
      return result;
    },
    onSuccess: (data) => {
      // Check if the response indicates sold out items
      if (!data.success && data.soldOutItems) {
        // Call the callback if provided
        if (options.onArtworkSoldOut) {
          options.onArtworkSoldOut(data.soldOutItems);
        }

        // Show error toast
        toast.error(data.error || "Some items are no longer available", {
          duration: 5000,
          description:
            "Please remove unavailable items from your cart and try again.",
        });

        return; // Don't redirect to checkout
      }

      // Redirect to Stripe checkout only if successful
      if (data.success && data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Checkout error:", error);

      // Extract error message from the server response
      let errorMessage = "Failed to create checkout session. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Show toast notification with the specific error
      toast.error(errorMessage, {
        duration: 5000,
        description:
          "Please remove unavailable items from your cart and try again.",
      });
    },
  });
}
