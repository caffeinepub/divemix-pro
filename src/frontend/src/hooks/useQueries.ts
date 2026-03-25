import { useQuery } from "@tanstack/react-query";
import type { GasMixture } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllCalculations() {
  const { actor, isFetching } = useActor();
  return useQuery<GasMixture[]>({
    queryKey: ["calculations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCalculations();
    },
    enabled: !!actor && !isFetching,
  });
}
