/** Waitlist — back-in-stock signups. */
export type Waitlist = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type WaitlistSummary = Pick<Waitlist, "id" | "label">;
