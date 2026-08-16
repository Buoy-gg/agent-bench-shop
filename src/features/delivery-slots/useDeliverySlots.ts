import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { deliverySlotsApi } from "./api";
import { deliverySlotsKeys } from "./keys";
import type { DeliverySlot } from "./types";

/** Read the scheduled delivery windows list. */
export function useDeliverySlots() {
  return useQuery({
    queryKey: deliverySlotsKeys.all(),
    queryFn: deliverySlotsApi.list,
  });
}

/**
 * Warm the delivery-slots cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmDeliverySlots() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await deliverySlotsApi.list();
      queryClient.setQueryData(deliverySlotsKeys.all(), rows);
      return rows as DeliverySlot[];
    },
    [queryClient]
  );
}
