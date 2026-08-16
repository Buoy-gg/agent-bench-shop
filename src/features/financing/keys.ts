export const financingKeys = {
  all: () => ["financing"] as const,
  detail: (id: string) => ["financing", id] as const,
};
