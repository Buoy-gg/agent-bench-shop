/** ExperimentFlag — A/B assignments. */
export type ExperimentFlag = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ExperimentFlagSummary = Pick<ExperimentFlag, "id" | "label">;
