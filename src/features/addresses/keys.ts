export const addressesKeys = {
  all: () => ["addresses"] as const,
  detail: (id: string) => ["addresses", id] as const,
};
