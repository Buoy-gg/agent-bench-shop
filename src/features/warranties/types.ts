/** Warranty — extended warranties. */
export type Warranty = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type WarrantySummary = Pick<Warranty, "id" | "label">;
