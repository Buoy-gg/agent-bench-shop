const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

export type Product = {
  id: string;
  name: string;
  price: number;
  material: string;
  description: string;
};

export type OrderItem = { productId: string; quantity: number };

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
  createGuestSession: () => request<{ token: string }>("/auth/guest", { method: "POST" }),
  createOrder: (token: string, items: OrderItem[]) =>
    request<{ orderId: string; total: number }>("/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items }),
    }),
};
