/** CarbonEstimate — delivery footprint. */
export type CarbonEstimate = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type CarbonEstimateSummary = Pick<CarbonEstimate, "id" | "label">;
