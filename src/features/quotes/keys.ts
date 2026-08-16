export const quotesKeys = {
  all: () => ["quotes"] as const,
  detail: (id: string) => ["quotes", id] as const,
};
