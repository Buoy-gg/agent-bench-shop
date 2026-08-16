/** Comparison — side-by-side compares. */
export type Comparison = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ComparisonSummary = Pick<Comparison, "id" | "label">;
