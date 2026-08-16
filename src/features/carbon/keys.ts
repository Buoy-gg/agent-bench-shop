export const carbonKeys = {
  all: () => ["carbon"] as const,
  detail: (id: string) => ["carbon", id] as const,
};
