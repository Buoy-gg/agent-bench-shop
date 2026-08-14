import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Every persisted key lives under this prefix so support can walk users
 * through clearing our data without touching anything else on the device.
 */
export const STORAGE_PREFIX = "abs";

export const keyFor = (name: string) => `${STORAGE_PREFIX}.${name}`;

export async function readJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return null;
  return JSON.parse(raw) as T;
}

export async function writeJSON(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
