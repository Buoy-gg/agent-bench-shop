import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { comparisonsApi } from "./api";
import { comparisonsKeys } from "./keys";
import type { Comparison } from "./types";

/** Read the side-by-side compares list. */
export function useComparisons() {
  return useQuery({
    queryKey: comparisonsKeys.all(),
    queryFn: comparisonsApi.list,
  });
}

/**
 * Warm the comparisons cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmComparisons() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await comparisonsApi.list();
      queryClient.setQueryData(comparisonsKeys.all(), rows);
      return rows as Comparison[];
    },
    [queryClient]
  );
}
