export const returnsKeys = {
  all: () => ["returns"] as const,
  detail: (id: string) => ["returns", id] as const,
};
