import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { bulkOrderApi } from "./api";
import { bulkOrderKeys } from "./keys";
import type { BulkOrder } from "./types";

/** Read the pallet orders list. */
export function useBulkOrder() {
  return useQuery({
    queryKey: bulkOrderKeys.all(),
    queryFn: bulkOrderApi.list,
  });
}

/**
 * Warm the bulk-order cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmBulkOrder() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await bulkOrderApi.list();
      queryClient.setQueryData(bulkOrderKeys.all(), rows);
      return rows as BulkOrder[];
    },
    [queryClient]
  );
}
