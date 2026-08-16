/** PaymentMethod — stored cards and wallets. */
export type PaymentMethod = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type PaymentMethodSummary = Pick<PaymentMethod, "id" | "label">;
