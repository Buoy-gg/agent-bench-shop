/** Donation — round-up donations. */
export type Donation = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type DonationSummary = Pick<Donation, "id" | "label">;
