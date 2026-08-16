export const savedCartsKeys = {
  all: () => ["saved-carts"] as const,
  detail: (id: string) => ["saved-carts", id] as const,
};
