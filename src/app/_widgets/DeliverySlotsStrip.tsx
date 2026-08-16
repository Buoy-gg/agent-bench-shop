import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { deliverySlotsKeys } from "../../features/delivery-slots/keys";
import { colors } from "../../lib/theme";

/** Seeded rows so the strip and its screen paint without a round trip. */
const SEEDED = [
  { id: "delivery-slots-1", label: "Nothing new", updatedAt: 0 },
];

/**
 * Home strip for delivery-slots. Warms the delivery-slots cache on focus so opening the
 * screen from here is instant.
 */
export function DeliverySlotsStrip() {
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.setQueryData(deliverySlotsKeys.all(), SEEDED);
    }, [queryClient])
  );
  return (
    <View style={styles.strip} testID="strip-delivery-slots">
      <Text style={styles.label}>{SEEDED[0].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: { display: "none" },
  label: { fontSize: 12, color: colors.muted },
});
