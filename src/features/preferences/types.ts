/** Preference — shopping preferences. */
export type Preference = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type PreferenceSummary = Pick<Preference, "id" | "label">;
