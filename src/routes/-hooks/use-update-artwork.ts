import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArtwork } from "../-fn/update-artwork";

export function useUpdateArtwork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateArtwork,
    onSuccess: (data) => {
      // Invalidate and refetch artworks list
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
      queryClient.invalidateQueries({ queryKey: ["artwork", data.id] });
    },
  });
}
