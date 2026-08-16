export const preferencesKeys = {
  all: () => ["preferences"] as const,
  detail: (id: string) => ["preferences", id] as const,
};
