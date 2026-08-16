/** Address — saved delivery addresses. */
export type Address = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type AddressSummary = Pick<Address, "id" | "label">;
