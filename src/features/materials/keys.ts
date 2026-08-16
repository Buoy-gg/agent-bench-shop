export const materialsKeys = {
  all: () => ["materials"] as const,
  detail: (id: string) => ["materials", id] as const,
};
