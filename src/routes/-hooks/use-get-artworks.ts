import { useQuery } from "@tanstack/react-query";
import { getArtworks } from "../-fn/get-artworks";

export function useGetArtworks() {
  return useQuery({
    queryKey: ["artworks"],
    queryFn: () => getArtworks(),
  });
}