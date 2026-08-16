import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { addressesApi } from "./api";
import { addressesKeys } from "./keys";
import type { Address } from "./types";

/** Read the saved delivery addresses list. */
export function useAddresses() {
  return useQuery({
    queryKey: addressesKeys.all(),
    queryFn: addressesApi.list,
  });
}

/**
 * Warm the addresses cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmAddresses() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await addressesApi.list();
      queryClient.setQueryData(addressesKeys.all(), rows);
      return rows as Address[];
    },
    [queryClient]
  );
}
