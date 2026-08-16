import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../../lib/theme";
import { usePriceAlerts } from "./usePriceAlerts";

/** watched price drops — reachable from the "More" screen. */
export function PriceAlertsScreen() {
  const { data } = usePriceAlerts();
  return (
    <View style={styles.screen} testID="price-alerts-screen">
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.detail}>Nothing here yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  label: { fontSize: 15, fontWeight: "600", color: colors.ink },
  detail: { fontSize: 13, color: colors.muted },
});
