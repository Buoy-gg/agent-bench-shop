/** ViewedItem — browse history. */
export type ViewedItem = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ViewedItemSummary = Pick<ViewedItem, "id" | "label">;
