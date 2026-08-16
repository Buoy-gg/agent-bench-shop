export const invoicesKeys = {
  all: () => ["invoices"] as const,
  detail: (id: string) => ["invoices", id] as const,
};
