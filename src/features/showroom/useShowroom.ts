import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { showroomApi } from "./api";
import { showroomKeys } from "./keys";
import type { ShowroomLook } from "./types";

/** Read the styled room shots list. */
export function useShowroom() {
  return useQuery({
    queryKey: showroomKeys.all(),
    queryFn: showroomApi.list,
  });
}

/**
 * Warm the showroom cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmShowroom() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await showroomApi.list();
      queryClient.setQueryData(showroomKeys.all(), rows);
      return rows as ShowroomLook[];
    },
    [queryClient]
  );
}
