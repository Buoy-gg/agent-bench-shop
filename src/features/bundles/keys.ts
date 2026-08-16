export const bundlesKeys = {
  all: () => ["bundles"] as const,
  detail: (id: string) => ["bundles", id] as const,
};
