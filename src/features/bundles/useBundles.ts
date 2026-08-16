import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { bundlesApi } from "./api";
import { bundlesKeys } from "./keys";
import type { Bundle } from "./types";

/** Read the product bundles list. */
export function useBundles() {
  return useQuery({
    queryKey: bundlesKeys.all(),
    queryFn: bundlesApi.list,
  });
}

/**
 * Warm the bundles cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmBundles() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await bundlesApi.list();
      queryClient.setQueryData(bundlesKeys.all(), rows);
      return rows as Bundle[];
    },
    [queryClient]
  );
}
