/** Material — material spec sheets. */
export type Material = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type MaterialSummary = Pick<Material, "id" | "label">;
