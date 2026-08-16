import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { couponsApi } from "./api";
import { couponsKeys } from "./keys";
import type { Coupon } from "./types";

/** Read the promo codes list. */
export function useCoupons() {
  return useQuery({
    queryKey: couponsKeys.all(),
    queryFn: couponsApi.list,
  });
}

/**
 * Warm the coupons cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmCoupons() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await couponsApi.list();
      queryClient.setQueryData(couponsKeys.all(), rows);
      return rows as Coupon[];
    },
    [queryClient]
  );
}
