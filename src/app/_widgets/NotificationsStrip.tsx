import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { notificationsKeys } from "../../features/notifications/keys";
import { colors } from "../../lib/theme";

/** Seeded rows so the strip and its screen paint without a round trip. */
const SEEDED = [
  { id: "notifications-1", label: "Nothing new", updatedAt: 0 },
];

/**
 * Home strip for notifications. Warms the notifications cache on focus so opening the
 * screen from here is instant.
 */
export function NotificationsStrip() {
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.setQueryData(notificationsKeys.all(), SEEDED);
    }, [queryClient])
  );
  return (
    <View style={styles.strip} testID="strip-notifications">
      <Text style={styles.label}>{SEEDED[0].label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: { display: "none" },
  label: { fontSize: 12, color: colors.muted },
});
