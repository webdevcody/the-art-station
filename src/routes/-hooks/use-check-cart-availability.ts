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
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data fresh for 10 seconds
  });
}
