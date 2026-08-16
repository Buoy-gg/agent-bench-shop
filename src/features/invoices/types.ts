/** Invoice — downloadable invoices. */
export type Invoice = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type InvoiceSummary = Pick<Invoice, "id" | "label">;
