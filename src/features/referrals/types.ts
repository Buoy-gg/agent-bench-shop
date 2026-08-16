/** Referral — refer-a-friend. */
export type Referral = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ReferralSummary = Pick<Referral, "id" | "label">;
