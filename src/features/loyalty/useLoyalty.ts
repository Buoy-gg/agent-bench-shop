import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { loyaltyApi } from "./api";
import { loyaltyKeys } from "./keys";
import type { LoyaltyTier } from "./types";

/** Read the points and tier status list. */
export function useLoyalty() {
  return useQuery({
    queryKey: loyaltyKeys.all(),
    queryFn: loyaltyApi.list,
  });
}

/**
 * Warm the loyalty cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmLoyalty() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await loyaltyApi.list();
      queryClient.setQueryData(loyaltyKeys.all(), rows);
      return rows as LoyaltyTier[];
    },
    [queryClient]
  );
}
