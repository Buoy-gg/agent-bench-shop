/** TaxExemption — exemption certificates. */
export type TaxExemption = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type TaxExemptionSummary = Pick<TaxExemption, "id" | "label">;
