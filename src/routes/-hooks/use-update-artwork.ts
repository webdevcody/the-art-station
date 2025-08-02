import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArtwork } from "../-fn/update-artwork";

export function useUpdateArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateArtwork,
    onSuccess: () => {
      // Invalidate and refetch artworks list
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}