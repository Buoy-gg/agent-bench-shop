import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { materialsApi } from "./api";
import { materialsKeys } from "./keys";
import type { Material } from "./types";

/** Read the material spec sheets list. */
export function useMaterials() {
  return useQuery({
    queryKey: materialsKeys.all(),
    queryFn: materialsApi.list,
  });
}

/**
 * Warm the materials cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmMaterials() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await materialsApi.list();
      queryClient.setQueryData(materialsKeys.all(), rows);
      return rows as Material[];
    },
    [queryClient]
  );
}
