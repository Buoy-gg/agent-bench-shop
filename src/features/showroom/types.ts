/** ShowroomLook — styled room shots. */
export type ShowroomLook = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ShowroomLookSummary = Pick<ShowroomLook, "id" | "label">;
