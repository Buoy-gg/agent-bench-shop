import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { reviewDraftsApi } from "./api";
import { reviewDraftsKeys } from "./keys";
import type { ReviewDraft } from "./types";

/** Read the unsubmitted reviews list. */
export function useReviewDrafts() {
  return useQuery({
    queryKey: reviewDraftsKeys.all(),
    queryFn: reviewDraftsApi.list,
  });
}

/**
 * Warm the review-drafts cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmReviewDrafts() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await reviewDraftsApi.list();
      queryClient.setQueryData(reviewDraftsKeys.all(), rows);
      return rows as ReviewDraft[];
    },
    [queryClient]
  );
}
