import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArtwork } from "../-fn/delete-artwork";

export function useDeleteArtwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteArtwork,
    onSuccess: () => {
      // Invalidate and refetch artworks list
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}