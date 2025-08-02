import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../-fn/update-order-status";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}