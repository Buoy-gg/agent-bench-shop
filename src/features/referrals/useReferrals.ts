import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { referralsApi } from "./api";
import { referralsKeys } from "./keys";
import type { Referral } from "./types";

/** Read the refer-a-friend list. */
export function useReferrals() {
  return useQuery({
    queryKey: referralsKeys.all(),
    queryFn: referralsApi.list,
  });
}

/**
 * Warm the referrals cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmReferrals() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await referralsApi.list();
      queryClient.setQueryData(referralsKeys.all(), rows);
      return rows as Referral[];
    },
    [queryClient]
  );
}
