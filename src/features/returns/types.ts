/** Return — return requests and labels. */
export type Return = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ReturnSummary = Pick<Return, "id" | "label">;
