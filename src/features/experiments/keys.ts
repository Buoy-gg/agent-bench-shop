export const experimentsKeys = {
  all: () => ["experiments"] as const,
  detail: (id: string) => ["experiments", id] as const,
};
