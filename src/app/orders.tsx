import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { api } from "../lib/api";
import { ensureSession } from "../lib/auth";
import { qk } from "../lib/query-keys";
import { colors } from "../lib/theme";

export default function OrdersScreen() {
  const { data, isPending, isError } = useQuery({
    queryKey: qk.orders(),
    queryFn: async () => api.getOrders(await ensureSession()),
  });

  if (isPending) {
    return <ActivityIndicator testID="orders-loading" style={styles.center} />;
  }

  if (isError || !data) {
    return (
      <View style={styles.center} testID="orders-error">
        <Text style={styles.errorText}>Couldn't load your orders.</Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.center} testID="orders-empty">
        <Text style={styles.emptyText}>No orders yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        testID="order-history-list"
        data={data}
        keyExtractor={(item) => item.orderId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const itemCount = item.items.reduce((sum, line) => sum + line.quantity, 0);
          return (
            <View style={styles.row} testID={`order-${item.orderId}`}>
              <View style={styles.rowBody}>
                <Text style={styles.orderId}>{item.orderId}</Text>
                <Text style={styles.meta}>
                  {new Date(item.placedAt).toLocaleDateString()} · {itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"}
                </Text>
              </View>
              <Text style={styles.total}>${item.total}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  emptyText: { fontSize: 16, color: colors.muted },
  errorText: { color: colors.danger, fontSize: 15 },
  list: { padding: 16, gap: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    gap: 12,
  },
  rowBody: { flex: 1, gap: 2 },
  orderId: { fontSize: 15, fontWeight: "600", color: colors.ink },
  meta: { fontSize: 13, color: colors.muted },
  total: { fontSize: 16, fontWeight: "700", color: colors.accent },
});
