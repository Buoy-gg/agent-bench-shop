import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { carbonApi } from "./api";
import { carbonKeys } from "./keys";
import type { CarbonEstimate } from "./types";

/** Read the delivery footprint list. */
export function useCarbon() {
  return useQuery({
    queryKey: carbonKeys.all(),
    queryFn: carbonApi.list,
  });
}

/**
 * Warm the carbon cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmCarbon() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await carbonApi.list();
      queryClient.setQueryData(carbonKeys.all(), rows);
      return rows as CarbonEstimate[];
    },
    [queryClient]
  );
}
