import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../-fn/create-checkout-session";
import { CartItem } from "@/types/cart";

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
      // You might want to show a toast notification here
    },
  });
}
