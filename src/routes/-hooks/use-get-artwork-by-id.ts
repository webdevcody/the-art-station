import { useQuery } from "@tanstack/react-query";
import { getArtworkById } from "../-fn/get-artwork-by-id";

export function useGetArtworkById(artworkId: string) {
  return useQuery({
    queryKey: ["artwork", artworkId],
    queryFn: () => getArtworkById({ data: artworkId }),
    enabled: !!artworkId,
  });
}