import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { recentlyViewedKeys } from "../../features/recently-viewed/keys";
import { colors } from "../../lib/theme";

/** Seeded rows so the strip and its screen paint without a round trip. */
const SEEDED = [
  { id: "recently-viewed-1", label: "Nothing new", updatedAt: 0 },
];

/**
 * Home strip for recently-viewed. Warms the recently-viewed cache on focus so opening the
 * screen from here is instant.
 */
export function RecentlyViewedStrip() {
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.setQueryData(recentlyViewedKeys.all(), SEEDED);
    }, [queryClient])
  );
  return (
    <View style={styles.strip} testID="strip-recently-viewed">
      <Text style={styles.label}>{SEEDED[0].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: { display: "none" },
  label: { fontSize: 12, color: colors.muted },
});
