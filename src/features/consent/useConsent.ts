import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { consentApi } from "./api";
import { consentKeys } from "./keys";
import type { ConsentRecord } from "./types";

/** Read the privacy consents list. */
export function useConsent() {
  return useQuery({
    queryKey: consentKeys.all(),
    queryFn: consentApi.list,
  });
}

/**
 * Warm the consent cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmConsent() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await consentApi.list();
      queryClient.setQueryData(consentKeys.all(), rows);
      return rows as ConsentRecord[];
    },
    [queryClient]
  );
}
