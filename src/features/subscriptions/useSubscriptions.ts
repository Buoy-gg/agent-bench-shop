import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { subscriptionsApi } from "./api";
import { subscriptionsKeys } from "./keys";
import type { Subscription } from "./types";

/** Read the recurring deliveries list. */
export function useSubscriptions() {
  return useQuery({
    queryKey: subscriptionsKeys.all(),
    queryFn: subscriptionsApi.list,
  });
}

/**
 * Warm the subscriptions cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmSubscriptions() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await subscriptionsApi.list();
      queryClient.setQueryData(subscriptionsKeys.all(), rows);
      return rows as Subscription[];
    },
    [queryClient]
  );
}
