import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { orderTrackingApi } from "./api";
import { orderTrackingKeys } from "./keys";
import type { Shipment } from "./types";

/** Read the carrier tracking list. */
export function useOrderTracking() {
  return useQuery({
    queryKey: orderTrackingKeys.all(),
    queryFn: orderTrackingApi.list,
  });
}

/**
 * Warm the order-tracking cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmOrderTracking() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await orderTrackingApi.list();
      queryClient.setQueryData(orderTrackingKeys.all(), rows);
      return rows as Shipment[];
    },
    [queryClient]
  );
}
