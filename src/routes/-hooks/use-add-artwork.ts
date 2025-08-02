import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addArtwork, type AddArtworkInput } from "@/routes/-fn/add-artwork";

export function useAddArtwork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddArtworkInput) => addArtwork({ data }),
    onSuccess: () => {
      // Invalidate artwork queries when a new artwork is added
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}