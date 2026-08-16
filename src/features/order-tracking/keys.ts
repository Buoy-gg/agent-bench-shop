export const orderTrackingKeys = {
  all: () => ["order-tracking"] as const,
  detail: (id: string) => ["order-tracking", id] as const,
};
