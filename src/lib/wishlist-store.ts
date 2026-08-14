import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "./api";
import { keyFor } from "./storage";

export type WishlistItem = {
  productId: string;
  name: string;
  price: number;
  addedAt: string;
};

type WishlistState = {
  items: WishlistItem[];
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.productId === product.id);
          if (exists) {
            return { items: state.items.filter((item) => item.productId !== product.id) };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                addedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
    }),
    { name: keyFor("wishlist"), storage: createJSONStorage(() => AsyncStorage) }
  )
);
