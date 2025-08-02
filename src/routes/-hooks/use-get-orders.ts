import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../-fn/get-orders";

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
}