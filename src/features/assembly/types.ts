/** AssemblyBooking — assembly appointments. */
export type AssemblyBooking = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type AssemblyBookingSummary = Pick<AssemblyBooking, "id" | "label">;
