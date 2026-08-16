import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { sizeGuidesApi } from "./api";
import { sizeGuidesKeys } from "./keys";
import type { SizeGuide } from "./types";

/** Read the dimension guides list. */
export function useSizeGuides() {
  return useQuery({
    queryKey: sizeGuidesKeys.all(),
    queryFn: sizeGuidesApi.list,
  });
}

/**
 * Warm the size-guides cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmSizeGuides() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await sizeGuidesApi.list();
      queryClient.setQueryData(sizeGuidesKeys.all(), rows);
      return rows as SizeGuide[];
    },
    [queryClient]
  );
}
