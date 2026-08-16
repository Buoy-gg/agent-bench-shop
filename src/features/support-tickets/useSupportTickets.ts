import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { supportTicketsApi } from "./api";
import { supportTicketsKeys } from "./keys";
import type { Ticket } from "./types";

/** Read the support conversations list. */
export function useSupportTickets() {
  return useQuery({
    queryKey: supportTicketsKeys.all(),
    queryFn: supportTicketsApi.list,
  });
}

/**
 * Warm the support-tickets cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmSupportTickets() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await supportTicketsApi.list();
      queryClient.setQueryData(supportTicketsKeys.all(), rows);
      return rows as Ticket[];
    },
    [queryClient]
  );
}
