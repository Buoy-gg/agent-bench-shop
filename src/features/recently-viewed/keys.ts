export const recentlyViewedKeys = {
  all: () => ["recently-viewed"] as const,
  detail: (id: string) => ["recently-viewed", id] as const,
};
