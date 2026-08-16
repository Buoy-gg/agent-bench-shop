import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { careGuidesApi } from "./api";
import { careGuidesKeys } from "./keys";
import type { CareGuide } from "./types";

/** Read the care instructions list. */
export function useCareGuides() {
  return useQuery({
    queryKey: careGuidesKeys.all(),
    queryFn: careGuidesApi.list,
  });
}

/**
 * Warm the care-guides cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmCareGuides() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await careGuidesApi.list();
      queryClient.setQueryData(careGuidesKeys.all(), rows);
      return rows as CareGuide[];
    },
    [queryClient]
  );
}
