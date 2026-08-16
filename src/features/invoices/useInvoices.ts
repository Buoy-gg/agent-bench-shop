import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { invoicesApi } from "./api";
import { invoicesKeys } from "./keys";
import type { Invoice } from "./types";

/** Read the downloadable invoices list. */
export function useInvoices() {
  return useQuery({
    queryKey: invoicesKeys.all(),
    queryFn: invoicesApi.list,
  });
}

/**
 * Warm the invoices cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmInvoices() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await invoicesApi.list();
      queryClient.setQueryData(invoicesKeys.all(), rows);
      return rows as Invoice[];
    },
    [queryClient]
  );
}
