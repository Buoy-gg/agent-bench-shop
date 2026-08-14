import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingDevTools } from "@buoy-gg/core";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { useEffect } from "react";

import { ensureSession } from "../lib/auth";
import { useCartStore } from "../lib/cart-store";
import { colors } from "../lib/theme";

const DAY_MS = 24 * 60 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: DAY_MS, staleTime: 30_000, retry: 1 },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "abs.query-cache",
});

export default function RootLayout() {
  useEffect(() => {
    ensureSession().catch((error) => {
      console.warn("Could not start a guest session", error);
    });
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: DAY_MS, buster: "v1" }}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Bench Shop" }} />
        <Stack.Screen name="product/[id]" options={{ title: "Details" }} />
        <Stack.Screen name="cart" options={{ title: "Your Cart" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
      </Stack>
      <FloatingDevTools
        licenseKey={process.env.EXPO_PUBLIC_BUOY_LICENSE}
        zustandStores={{ cartStore: useCartStore }}
      />
    </PersistQueryClientProvider>
  );
}
