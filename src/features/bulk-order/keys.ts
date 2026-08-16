export const bulkOrderKeys = {
  all: () => ["bulk-order"] as const,
  detail: (id: string) => ["bulk-order", id] as const,
};
