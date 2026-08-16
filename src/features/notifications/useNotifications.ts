import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { notificationsApi } from "./api";
import { notificationsKeys } from "./keys";
import type { Notification } from "./types";

/** Read the push and in-app notices list. */
export function useNotifications() {
  return useQuery({
    queryKey: notificationsKeys.all(),
    queryFn: notificationsApi.list,
  });
}

/**
 * Warm the notifications cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmNotifications() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await notificationsApi.list();
      queryClient.setQueryData(notificationsKeys.all(), rows);
      return rows as Notification[];
    },
    [queryClient]
  );
}
