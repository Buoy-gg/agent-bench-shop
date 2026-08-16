import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { preferencesApi } from "./api";
import { preferencesKeys } from "./keys";
import type { Preference } from "./types";

/** Read the shopping preferences list. */
export function usePreferences() {
  return useQuery({
    queryKey: preferencesKeys.all(),
    queryFn: preferencesApi.list,
  });
}

/**
 * Warm the preferences cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmPreferences() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await preferencesApi.list();
      queryClient.setQueryData(preferencesKeys.all(), rows);
      return rows as Preference[];
    },
    [queryClient]
  );
}
