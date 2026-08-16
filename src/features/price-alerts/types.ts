/** PriceAlert — watched price drops. */
export type PriceAlert = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type PriceAlertSummary = Pick<PriceAlert, "id" | "label">;
