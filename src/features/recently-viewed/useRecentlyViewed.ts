import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { recentlyViewedApi } from "./api";
import { recentlyViewedKeys } from "./keys";
import type { ViewedItem } from "./types";

/** Read the browse history list. */
export function useRecentlyViewed() {
  return useQuery({
    queryKey: recentlyViewedKeys.all(),
    queryFn: recentlyViewedApi.list,
  });
}

/**
 * Warm the recently-viewed cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmRecentlyViewed() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await recentlyViewedApi.list();
      queryClient.setQueryData(recentlyViewedKeys.all(), rows);
      return rows as ViewedItem[];
    },
    [queryClient]
  );
}
