import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { packagingApi } from "./api";
import { packagingKeys } from "./keys";
import type { PackagingOption } from "./types";

/** Read the packaging choices list. */
export function usePackaging() {
  return useQuery({
    queryKey: packagingKeys.all(),
    queryFn: packagingApi.list,
  });
}

/**
 * Warm the packaging cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmPackaging() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await packagingApi.list();
      queryClient.setQueryData(packagingKeys.all(), rows);
      return rows as PackagingOption[];
    },
    [queryClient]
  );
}
