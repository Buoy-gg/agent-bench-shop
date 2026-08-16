export const faqKeys = {
  all: () => ["faq"] as const,
  detail: (id: string) => ["faq", id] as const,
};
