/** FaqEntry — help articles. */
export type FaqEntry = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type FaqEntrySummary = Pick<FaqEntry, "id" | "label">;
