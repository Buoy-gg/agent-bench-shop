/** ConsentRecord — privacy consents. */
export type ConsentRecord = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ConsentRecordSummary = Pick<ConsentRecord, "id" | "label">;
