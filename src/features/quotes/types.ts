/** Quote — bulk quotes. */
export type Quote = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type QuoteSummary = Pick<Quote, "id" | "label">;
