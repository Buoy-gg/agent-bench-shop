import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { cartTotal, useCartStore } from "../lib/cart-store";
import { colors } from "../lib/theme";

export default function CartScreen() {
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const total = cartTotal(lines);

  if (lines.length === 0) {
    return (
      <View style={styles.center} testID="cart-empty">
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        testID="cart-list"
        data={lines}
        keyExtractor={(line) => line.productId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row} testID={`cart-line-${item.productId}`}>
            <View style={styles.rowBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>${item.price} each</Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                testID={`decrease-${item.productId}`}
                hitSlop={8}
                style={styles.stepButton}
                onPress={() => setQuantity(item.productId, item.quantity - 1)}
              >
                <Text style={styles.stepText}>−</Text>
              </Pressable>
              <Text style={styles.quantity} testID={`quantity-${item.productId}`}>
                {item.quantity}
              </Text>
              <Pressable
                testID={`increase-${item.productId}`}
                hitSlop={8}
                style={styles.stepButton}
                onPress={() => setQuantity(item.productId, item.quantity + 1)}
              >
                <Text style={styles.stepText}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue} testID="cart-total">
            ${total}
          </Text>
        </View>
        <Link href="/checkout" asChild>
          <Pressable testID="checkout-button" style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </Link>
      </View>
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
  stepper: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { fontSize: 17, color: colors.ink, fontWeight: "600" },
  quantity: { fontSize: 15, fontWeight: "700", color: colors.ink, minWidth: 18, textAlign: "center" },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    padding: 16,
    paddingBottom: 28,
    gap: 12,
    backgroundColor: colors.card,
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontSize: 16, color: colors.muted },
  totalValue: { fontSize: 18, fontWeight: "800", color: colors.ink },
  checkoutButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  checkoutText: { color: colors.accentText, fontSize: 16, fontWeight: "600" },
});
