export const storeLocatorKeys = {
  all: () => ["store-locator"] as const,
  detail: (id: string) => ["store-locator", id] as const,
};
