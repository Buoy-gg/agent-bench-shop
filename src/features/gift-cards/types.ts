/** GiftCard — gift card balances. */
export type GiftCard = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type GiftCardSummary = Pick<GiftCard, "id" | "label">;
