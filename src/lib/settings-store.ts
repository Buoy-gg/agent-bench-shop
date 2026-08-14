import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { keyFor } from "./storage";

type SettingsState = {
  orderUpdates: boolean;
  marketingEmails: boolean;
  showRecentSearches: boolean;
  setOrderUpdates: (value: boolean) => void;
  setMarketingEmails: (value: boolean) => void;
  setShowRecentSearches: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      orderUpdates: true,
      marketingEmails: false,
      showRecentSearches: true,
      setOrderUpdates: (value) => set({ orderUpdates: value }),
      setMarketingEmails: (value) => set({ marketingEmails: value }),
      setShowRecentSearches: (value) => set({ showRecentSearches: value }),
    }),
    { name: keyFor("settings"), storage: createJSONStorage(() => AsyncStorage) }
  )
);
