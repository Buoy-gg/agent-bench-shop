import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { warrantiesApi } from "./api";
import { warrantiesKeys } from "./keys";
import type { Warranty } from "./types";

/** Read the extended warranties list. */
export function useWarranties() {
  return useQuery({
    queryKey: warrantiesKeys.all(),
    queryFn: warrantiesApi.list,
  });
}

/**
 * Warm the warranties cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmWarranties() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await warrantiesApi.list();
      queryClient.setQueryData(warrantiesKeys.all(), rows);
      return rows as Warranty[];
    },
    [queryClient]
  );
}
