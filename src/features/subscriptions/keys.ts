export const subscriptionsKeys = {
  all: () => ["subscriptions"] as const,
  detail: (id: string) => ["subscriptions", id] as const,
};
