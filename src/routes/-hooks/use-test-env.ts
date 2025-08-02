import { useQuery } from "@tanstack/react-query";
import { testEnv } from "../-fn/test-env";

export function useTestEnv() {
  return useQuery({
    queryKey: ["test-env"],
    queryFn: async () => {
      return await testEnv();
    },
  });
}
