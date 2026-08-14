import type { Product } from "./api";
import { readJSON, writeJSON } from "./storage";

const RECENT_KEY = "abs.recent";
const RECENT_LIMIT = 6;

export type ViewedProduct = {
  id: string;
  name: string;
  price: number;
  at: number;
};

export async function recordView(product: Product): Promise<void> {
  const list = (await readJSON<ViewedProduct[]>(RECENT_KEY)) ?? [];
  const next = [
    { id: product.id, name: product.name, price: product.price, at: Date.now() },
    ...list.filter((item) => item.id !== product.id),
  ].slice(0, RECENT_LIMIT);
  await writeJSON(RECENT_KEY, next);
}

export async function getRecentlyViewed(): Promise<ViewedProduct[]> {
  return (await readJSON<ViewedProduct[]>(RECENT_KEY)) ?? [];
}
