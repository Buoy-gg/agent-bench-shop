import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "./api";

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (product) =>
        set((state) => {
          const existing = state.lines.find((line) => line.productId === product.id);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.productId === product.id
                  ? { ...line, quantity: line.quantity + 1 }
                  : line
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              },
            ],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.productId !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.productId !== productId)
              : state.lines.map((line) =>
                  line.productId === productId ? { ...line, quantity } : line
                ),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "abs.cart",
      storage: createJSONStorage(() => ({
        getItem: (name) => AsyncStorage.getItem(`v2.${name}`),
        setItem: (name, value) => AsyncStorage.setItem(name, value),
        removeItem: (name) => AsyncStorage.removeItem(name),
      })),
    }
  )
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}
