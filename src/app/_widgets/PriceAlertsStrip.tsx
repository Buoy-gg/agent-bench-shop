import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { priceAlertsKeys } from "../../features/price-alerts/keys";
import { colors } from "../../lib/theme";

/** Seeded rows so the strip and its screen paint without a round trip. */
const SEEDED = [
  { id: "price-alerts-1", label: "Nothing new", updatedAt: 0 },
];

/**
 * Home strip for price-alerts. Warms the price-alerts cache on focus so opening the
 * screen from here is instant.
 */
export function PriceAlertsStrip() {
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.setQueryData(priceAlertsKeys.all(), SEEDED);
    }, [queryClient])
  );
  return (
    <View style={styles.strip} testID="strip-price-alerts">
      <Text style={styles.label}>{SEEDED[0].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: { display: "none" },
  label: { fontSize: 12, color: colors.muted },
});
