import type { GiftCard, GiftCardSummary } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const giftCardsApi = {
  list: () => read<GiftCard[]>("/gift-cards"),
  /** The short list the home strip shows. */
  recent: (limit = 3) => read<GiftCardSummary[]>(`/gift-cards?limit=${limit}`),
  detail: (id: string) => read<GiftCard>(`/gift-cards/${id}`),
};
