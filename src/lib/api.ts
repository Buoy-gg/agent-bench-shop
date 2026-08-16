const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

export type Product = {
  id: string;
  name: string;
  price: number;
  material: string;
  description: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  at: string;
};

export type OrderItem = { productId: string; quantity: number };

export type Order = {
  orderId: string;
  total: number;
  status: string;
  placedAt: string;
  items: OrderItem[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProducts: () => request<Product[]>("/products"),
  getProduct: (id: string) => request<Product>(`/products/${id}`),
  searchProducts: (q: string) =>
    request<Product[]>(`/products?q=${encodeURIComponent(q)}`),
  getReviews: (productId: string) =>
    request<Review[]>(`/products/${productId}/reviews`),
  /** The N most recent orders — used by the home screen's "recent order" strip. */
  getRecentOrders: (token: string, limit = 1) =>
    request<Order[]>(`/orders?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getOrders: (token: string) =>
    request<Order[]>("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  /**
   * @deprecated 1.x catalog route, kept only until the old share-link format
   * is fully retired. Use getProduct instead.
   */
  getCatalogItem: (id: string) => request<Product>(`/catalog/${id}`),
  createGuestSession: () => request<{ token: string }>("/auth/guest", { method: "POST" }),
  createOrder: (token: string, items: OrderItem[]) =>
    request<{ orderId: string; total: number }>("/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items }),
    }),
};
