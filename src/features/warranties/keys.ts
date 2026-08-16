export const warrantiesKeys = {
  all: () => ["warranties"] as const,
  detail: (id: string) => ["warranties", id] as const,
};
