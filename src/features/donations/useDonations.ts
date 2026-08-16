import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { donationsApi } from "./api";
import { donationsKeys } from "./keys";
import type { Donation } from "./types";

/** Read the round-up donations list. */
export function useDonations() {
  return useQuery({
    queryKey: donationsKeys.all(),
    queryFn: donationsApi.list,
  });
}

/**
 * Warm the donations cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmDonations() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await donationsApi.list();
      queryClient.setQueryData(donationsKeys.all(), rows);
      return rows as Donation[];
    },
    [queryClient]
  );
}
