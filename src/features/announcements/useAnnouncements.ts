import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { announcementsApi } from "./api";
import { announcementsKeys } from "./keys";
import type { Announcement } from "./types";

/** Read the store announcements list. */
export function useAnnouncements() {
  return useQuery({
    queryKey: announcementsKeys.all(),
    queryFn: announcementsApi.list,
  });
}

/**
 * Warm the announcements cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmAnnouncements() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await announcementsApi.list();
      queryClient.setQueryData(announcementsKeys.all(), rows);
      return rows as Announcement[];
    },
    [queryClient]
  );
}
