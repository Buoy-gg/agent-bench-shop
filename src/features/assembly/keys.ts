export const assemblyKeys = {
  all: () => ["assembly"] as const,
  detail: (id: string) => ["assembly", id] as const,
};
