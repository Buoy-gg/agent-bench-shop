/** Bundle — product bundles. */
export type Bundle = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type BundleSummary = Pick<Bundle, "id" | "label">;
