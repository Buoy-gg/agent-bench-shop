/**
 * Query keys in one place, so a screen and the code that warms its cache can
 * never drift apart.
 */
export const qk = {
  products: () => ["products"] as const,
  product: (id: string) => ["products", id] as const,
  reviews: (productId: string) => ["reviews", productId] as const,
  orders: () => ["orders"] as const,
};
