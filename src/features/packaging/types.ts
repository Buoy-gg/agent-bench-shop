/** PackagingOption — packaging choices. */
export type PackagingOption = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type PackagingOptionSummary = Pick<PackagingOption, "id" | "label">;
