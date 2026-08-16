/** ReviewDraft — unsubmitted reviews. */
export type ReviewDraft = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ReviewDraftSummary = Pick<ReviewDraft, "id" | "label">;
