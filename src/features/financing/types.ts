/** FinancingOffer — pay-over-time offers. */
export type FinancingOffer = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type FinancingOfferSummary = Pick<FinancingOffer, "id" | "label">;
