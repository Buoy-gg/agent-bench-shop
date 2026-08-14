import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { api } from "../lib/api";
import { getSessionToken } from "../lib/auth";
import { cartTotal, useCartStore } from "../lib/cart-store";
import { colors } from "../lib/theme";

export default function CheckoutScreen() {
  const lines = useCartStore((state) => state.lines);
  const clear = useCartStore((state) => state.clear);

  const order = useMutation({
    mutationFn: async () => {
      const token = await getSessionToken();
      if (!token) {
        throw new Error("No session — restart the app and try again.");
      }
      return api.createOrder(
        token,
        lines.map((line) => ({ productId: line.productId, quantity: line.quantity }))
      );
    },
    onSuccess: () => clear(),
  });

  if (order.isSuccess) {
    return (
      <View style={styles.center} testID="order-confirmation">
        <View style={styles.confirmCircle}>
          <Text style={styles.confirmCheck}>✓</Text>
        </View>
        <Text style={styles.confirmTitle}>Order placed!</Text>
        <Text style={styles.meta} testID="order-id">
          {order.data.orderId}
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.primaryButton} testID="back-to-shop">
            <Text style={styles.primaryButtonText}>Back to the shop</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        {lines.map((line) => (
          <View key={line.productId} style={styles.summaryRow}>
            <Text style={styles.summaryName}>
              {line.quantity} × {line.name}
            </Text>
            <Text style={styles.summaryPrice}>${line.price * line.quantity}</Text>
          </View>
        ))}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue} testID="checkout-total">
            ${cartTotal(lines)}
          </Text>
        </View>
      </View>
      {order.isError && (
        <Text style={styles.errorText} testID="checkout-error">
          {order.error.message}
        </Text>
      )}
      <Pressable
        testID="place-order"
        style={[styles.primaryButton, order.isPending && styles.buttonDisabled]}
        disabled={order.isPending || lines.length === 0}
        onPress={() => order.mutate()}
      >
        <Text style={styles.primaryButtonText}>
          {order.isPending ? "Placing order…" : "Place order"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24 },
  summary: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    gap: 10,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryName: { fontSize: 15, color: colors.ink },
  summaryPrice: { fontSize: 15, fontWeight: "600", color: colors.ink },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { fontSize: 16, color: colors.muted },
  totalValue: { fontSize: 18, fontWeight: "800", color: colors.ink },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: colors.accentText, fontSize: 16, fontWeight: "600" },
  confirmCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmCheck: { color: colors.accentText, fontSize: 36, fontWeight: "700" },
  confirmTitle: { fontSize: 22, fontWeight: "700", color: colors.ink },
  meta: { fontSize: 13, color: colors.muted },
  errorText: { color: colors.danger, fontSize: 14, textAlign: "center" },
});
