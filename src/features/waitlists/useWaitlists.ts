import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { waitlistsApi } from "./api";
import { waitlistsKeys } from "./keys";
import type { Waitlist } from "./types";

/** Read the back-in-stock signups list. */
export function useWaitlists() {
  return useQuery({
    queryKey: waitlistsKeys.all(),
    queryFn: waitlistsApi.list,
  });
}

/**
 * Warm the waitlists cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmWaitlists() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await waitlistsApi.list();
      queryClient.setQueryData(waitlistsKeys.all(), rows);
      return rows as Waitlist[];
    },
    [queryClient]
  );
}
