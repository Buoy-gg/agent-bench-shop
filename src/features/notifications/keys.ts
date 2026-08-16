export const notificationsKeys = {
  all: () => ["notifications"] as const,
  detail: (id: string) => ["notifications", id] as const,
};
