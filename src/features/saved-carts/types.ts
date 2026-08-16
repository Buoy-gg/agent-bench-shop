/** SavedCart — carts kept for later. */
export type SavedCart = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type SavedCartSummary = Pick<SavedCart, "id" | "label">;
