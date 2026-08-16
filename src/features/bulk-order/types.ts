/** BulkOrder — pallet orders. */
export type BulkOrder = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type BulkOrderSummary = Pick<BulkOrder, "id" | "label">;
