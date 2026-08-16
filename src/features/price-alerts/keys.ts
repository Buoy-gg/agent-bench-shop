export const priceAlertsKeys = {
  all: () => ["price-alerts"] as const,
  detail: (id: string) => ["price-alerts", id] as const,
};
