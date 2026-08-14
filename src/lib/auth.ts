import * as SecureStore from "expo-secure-store";

import { api } from "./api";

const TOKEN_KEY = "abs.session-token";

export async function ensureSession(): Promise<string> {
  const existing = await SecureStore.getItemAsync(TOKEN_KEY);
  if (existing) return existing;
  const { token } = await api.createGuestSession();
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return token;
}

export async function getSessionToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}
