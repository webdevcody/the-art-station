import { useQuery } from "@tanstack/react-query";
import { getFeaturedArtworks } from "../-fn/get-featured-artworks";

export function useGetFeaturedArtworks() {
  return useQuery({
    queryKey: ["featured-artworks"],
    queryFn: () => getFeaturedArtworks(),
  });
}