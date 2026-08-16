export const donationsKeys = {
  all: () => ["donations"] as const,
  detail: (id: string) => ["donations", id] as const,
};
