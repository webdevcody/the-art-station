import { useQuery } from "@tanstack/react-query";
import { checkCartAvailability } from "../-fn/check-cart-availability";
import { CartItem } from "@/types/cart";

export function useCheckCartAvailability(items: CartItem[]) {
  return useQuery({
    queryKey: ["cart-availability", items.map((item) => item.artworkId)],
    queryFn: async () => {
      if (items.length === 0) {
        return { availableItems: [], unavailableItems: [] };
      }

      const artworkIds = items.map((item) => item.artworkId);
      const result = await checkCartAvailability({ data: { artworkIds } });

      const availableItems = items.filter((item) =>
        result.availableArtworkIds.includes(item.artworkId)
      );

      const unavailableItems = items.filter((item) =>
        result.unavailableArtworkIds.includes(item.artworkId)
      );

      return { availableItems, unavailableItems };
    },
    enabled: items.length > 0,
    refetchInterval: 15000, // Refetch every 15 seconds (reduced from 30)
    staleTime: 5000, // Consider data fresh for 5 seconds (reduced from 10)
    refetchOnWindowFocus: false, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch when component mounts
  });
}
