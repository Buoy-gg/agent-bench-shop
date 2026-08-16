export const loyaltyKeys = {
  all: () => ["loyalty"] as const,
  detail: (id: string) => ["loyalty", id] as const,
};
