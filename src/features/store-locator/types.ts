/** Store — nearby stores and stock. */
export type Store = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type StoreSummary = Pick<Store, "id" | "label">;
