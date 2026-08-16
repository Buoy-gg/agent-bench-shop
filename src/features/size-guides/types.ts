/** SizeGuide — dimension guides. */
export type SizeGuide = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type SizeGuideSummary = Pick<SizeGuide, "id" | "label">;
