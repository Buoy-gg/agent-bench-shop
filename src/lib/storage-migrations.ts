import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * One-time cleanups from the 1.x storage layout. Each step is a no-op once
 * the old key is gone, so this is safe to run on every launch.
 */
const LEGACY_CART_KEY = "bench-shop:cart"; // 1.x kept the cart outside the abs.* namespace
const LEGACY_SEARCHES_KEY = "abs.recent-searches"; // renamed in 2.0; the old shape is not compatible

export async function runStorageMigrations(): Promise<void> {
  const legacyCart = await AsyncStorage.getItem(LEGACY_CART_KEY);
  if (legacyCart != null) {
    // The 1.x cart line shape predates the current store; dropping it is the
    // supported upgrade path (the cart was never guaranteed across updates).
    await AsyncStorage.removeItem(LEGACY_CART_KEY);
  }

  const legacySearches = await AsyncStorage.getItem(LEGACY_SEARCHES_KEY);
  if (legacySearches != null) {
    await AsyncStorage.removeItem(LEGACY_SEARCHES_KEY);
  }
}
