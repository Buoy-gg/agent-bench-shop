import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { priceAlertsApi } from "./api";
import { priceAlertsKeys } from "./keys";
import type { PriceAlert } from "./types";

/** Read the watched price drops list. */
export function usePriceAlerts() {
  return useQuery({
    queryKey: priceAlertsKeys.all(),
    queryFn: priceAlertsApi.list,
  });
}

/**
 * Warm the price-alerts cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmPriceAlerts() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await priceAlertsApi.list();
      queryClient.setQueryData(priceAlertsKeys.all(), rows);
      return rows as PriceAlert[];
    },
    [queryClient]
  );
}
