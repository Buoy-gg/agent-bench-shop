export const giftCardsKeys = {
  all: () => ["gift-cards"] as const,
  detail: (id: string) => ["gift-cards", id] as const,
};
