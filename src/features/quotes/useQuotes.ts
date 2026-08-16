import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { quotesApi } from "./api";
import { quotesKeys } from "./keys";
import type { Quote } from "./types";

/** Read the bulk quotes list. */
export function useQuotes() {
  return useQuery({
    queryKey: quotesKeys.all(),
    queryFn: quotesApi.list,
  });
}

/**
 * Warm the quotes cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmQuotes() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await quotesApi.list();
      queryClient.setQueryData(quotesKeys.all(), rows);
      return rows as Quote[];
    },
    [queryClient]
  );
}
