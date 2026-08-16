import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { experimentsApi } from "./api";
import { experimentsKeys } from "./keys";
import type { ExperimentFlag } from "./types";

/** Read the A/B assignments list. */
export function useExperiments() {
  return useQuery({
    queryKey: experimentsKeys.all(),
    queryFn: experimentsApi.list,
  });
}

/**
 * Warm the experiments cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmExperiments() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await experimentsApi.list();
      queryClient.setQueryData(experimentsKeys.all(), rows);
      return rows as ExperimentFlag[];
    },
    [queryClient]
  );
}
