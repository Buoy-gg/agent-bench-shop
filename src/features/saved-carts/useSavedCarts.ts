import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { savedCartsApi } from "./api";
import { savedCartsKeys } from "./keys";
import type { SavedCart } from "./types";

/** Read the carts kept for later list. */
export function useSavedCarts() {
  return useQuery({
    queryKey: savedCartsKeys.all(),
    queryFn: savedCartsApi.list,
  });
}

/**
 * Warm the saved-carts cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmSavedCarts() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await savedCartsApi.list();
      queryClient.setQueryData(savedCartsKeys.all(), rows);
      return rows as SavedCart[];
    },
    [queryClient]
  );
}
