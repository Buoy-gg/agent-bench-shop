import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../../lib/theme";
import { useGiftCards } from "./useGiftCards";

/** gift card balances — reachable from the "More" screen. */
export function GiftCardsScreen() {
  const { data } = useGiftCards();
  return (
    <View style={styles.screen} testID="gift-cards-screen">
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
