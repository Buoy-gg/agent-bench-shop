import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useWishlistStore } from "../lib/wishlist-store";
import { colors } from "../lib/theme";

export default function WishlistScreen() {
  const items = useWishlistStore((state) => state.items);
  const remove = useWishlistStore((state) => state.remove);

  if (items.length === 0) {
    return (
      <View style={styles.center} testID="wishlist-empty">
        <Text style={styles.emptyText}>Nothing saved yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        testID="wishlist-list"
        data={items}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: "/product/[id]", params: { id: item.productId } }}
            asChild
          >
            <Pressable testID={`wishlist-${item.productId}`} style={styles.row}>
              <View style={styles.rowBody}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>${item.price}</Text>
              </View>
              <Pressable
                testID={`wishlist-remove-${item.productId}`}
                hitSlop={8}
                style={styles.removeButton}
                onPress={() => remove(item.productId)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  emptyText: { fontSize: 16, color: colors.muted },
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
  name: { fontSize: 15, fontWeight: "600", color: colors.ink },
  meta: { fontSize: 13, color: colors.muted },
  removeButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  removeText: { fontSize: 13, fontWeight: "600", color: colors.danger },
});
