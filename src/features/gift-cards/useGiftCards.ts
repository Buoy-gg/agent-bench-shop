import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { giftCardsApi } from "./api";
import { giftCardsKeys } from "./keys";
import type { GiftCard } from "./types";

/** Read the gift card balances list. */
export function useGiftCards() {
  return useQuery({
    queryKey: giftCardsKeys.all(),
    queryFn: giftCardsApi.list,
  });
}

/**
 * Warm the gift-cards cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmGiftCards() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await giftCardsApi.list();
      queryClient.setQueryData(giftCardsKeys.all(), rows);
      return rows as GiftCard[];
    },
    [queryClient]
  );
}
