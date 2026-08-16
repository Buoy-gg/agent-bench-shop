export const couponsKeys = {
  all: () => ["coupons"] as const,
  detail: (id: string) => ["coupons", id] as const,
};
