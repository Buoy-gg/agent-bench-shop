import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { tradeAccountsApi } from "./api";
import { tradeAccountsKeys } from "./keys";
import type { TradeAccount } from "./types";

/** Read the business accounts list. */
export function useTradeAccounts() {
  return useQuery({
    queryKey: tradeAccountsKeys.all(),
    queryFn: tradeAccountsApi.list,
  });
}

/**
 * Warm the trade-accounts cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmTradeAccounts() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await tradeAccountsApi.list();
      queryClient.setQueryData(tradeAccountsKeys.all(), rows);
      return rows as TradeAccount[];
    },
    [queryClient]
  );
}
