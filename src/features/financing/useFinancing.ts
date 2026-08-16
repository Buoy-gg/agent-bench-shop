import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { financingApi } from "./api";
import { financingKeys } from "./keys";
import type { FinancingOffer } from "./types";

/** Read the pay-over-time offers list. */
export function useFinancing() {
  return useQuery({
    queryKey: financingKeys.all(),
    queryFn: financingApi.list,
  });
}

/**
 * Warm the financing cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmFinancing() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await financingApi.list();
      queryClient.setQueryData(financingKeys.all(), rows);
      return rows as FinancingOffer[];
    },
    [queryClient]
  );
}
