import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { taxExemptionApi } from "./api";
import { taxExemptionKeys } from "./keys";
import type { TaxExemption } from "./types";

/** Read the exemption certificates list. */
export function useTaxExemption() {
  return useQuery({
    queryKey: taxExemptionKeys.all(),
    queryFn: taxExemptionApi.list,
  });
}

/**
 * Warm the tax-exemption cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmTaxExemption() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await taxExemptionApi.list();
      queryClient.setQueryData(taxExemptionKeys.all(), rows);
      return rows as TaxExemption[];
    },
    [queryClient]
  );
}
