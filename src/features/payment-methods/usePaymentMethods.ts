import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { paymentMethodsApi } from "./api";
import { paymentMethodsKeys } from "./keys";
import type { PaymentMethod } from "./types";

/** Read the stored cards and wallets list. */
export function usePaymentMethods() {
  return useQuery({
    queryKey: paymentMethodsKeys.all(),
    queryFn: paymentMethodsApi.list,
  });
}

/**
 * Warm the payment-methods cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmPaymentMethods() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await paymentMethodsApi.list();
      queryClient.setQueryData(paymentMethodsKeys.all(), rows);
      return rows as PaymentMethod[];
    },
    [queryClient]
  );
}
