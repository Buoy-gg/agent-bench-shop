export const comparisonsKeys = {
  all: () => ["comparisons"] as const,
  detail: (id: string) => ["comparisons", id] as const,
};
