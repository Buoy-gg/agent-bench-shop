/** LoyaltyTier — points and tier status. */
export type LoyaltyTier = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type LoyaltyTierSummary = Pick<LoyaltyTier, "id" | "label">;
