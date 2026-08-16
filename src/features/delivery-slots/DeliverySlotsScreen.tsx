import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../../lib/theme";
import { useDeliverySlots } from "./useDeliverySlots";

/** scheduled delivery windows — reachable from the "More" screen. */
export function DeliverySlotsScreen() {
  const { data } = useDeliverySlots();
  return (
    <View style={styles.screen} testID="delivery-slots-screen">
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
