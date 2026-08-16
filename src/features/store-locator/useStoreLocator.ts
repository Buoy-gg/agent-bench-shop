import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { storeLocatorApi } from "./api";
import { storeLocatorKeys } from "./keys";
import type { Store } from "./types";

/** Read the nearby stores and stock list. */
export function useStoreLocator() {
  return useQuery({
    queryKey: storeLocatorKeys.all(),
    queryFn: storeLocatorApi.list,
  });
}

/**
 * Warm the store-locator cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmStoreLocator() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await storeLocatorApi.list();
      queryClient.setQueryData(storeLocatorKeys.all(), rows);
      return rows as Store[];
    },
    [queryClient]
  );
}
