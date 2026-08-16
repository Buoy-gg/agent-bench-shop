/** CareGuide — care instructions. */
export type CareGuide = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type CareGuideSummary = Pick<CareGuide, "id" | "label">;
