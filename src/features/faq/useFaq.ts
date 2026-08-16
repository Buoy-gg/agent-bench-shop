import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { faqApi } from "./api";
import { faqKeys } from "./keys";
import type { FaqEntry } from "./types";

/** Read the help articles list. */
export function useFaq() {
  return useQuery({
    queryKey: faqKeys.all(),
    queryFn: faqApi.list,
  });
}

/**
 * Warm the faq cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmFaq() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await faqApi.list();
      queryClient.setQueryData(faqKeys.all(), rows);
      return rows as FaqEntry[];
    },
    [queryClient]
  );
}
