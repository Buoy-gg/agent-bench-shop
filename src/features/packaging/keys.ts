export const packagingKeys = {
  all: () => ["packaging"] as const,
  detail: (id: string) => ["packaging", id] as const,
};
