import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../-fn/create-checkout-session";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (items: CartItem[]) => {
      const result = await createCheckoutSession({ data: { items } });
      return result;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
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
