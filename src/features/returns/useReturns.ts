import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { returnsApi } from "./api";
import { returnsKeys } from "./keys";
import type { Return } from "./types";

/** Read the return requests and labels list. */
export function useReturns() {
  return useQuery({
    queryKey: returnsKeys.all(),
    queryFn: returnsApi.list,
  });
}

/**
 * Warm the returns cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmReturns() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await returnsApi.list();
      queryClient.setQueryData(returnsKeys.all(), rows);
      return rows as Return[];
    },
    [queryClient]
  );
}
