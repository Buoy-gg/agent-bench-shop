import { useQuery } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "../lib/api";
import { cartCount, useCartStore } from "../lib/cart-store";
import { colors } from "../lib/theme";

function CartButton() {
  const count = useCartStore((state) => cartCount(state.lines));
  return (
    <Link href="/cart" asChild>
      <Pressable testID="cart-button" hitSlop={8} style={styles.cartButton}>
        <Text style={styles.cartLabel}>Cart</Text>
        {count > 0 && (
          <View testID="cart-badge" style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default function ProductsScreen() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: api.getProducts,
  });

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerRight: () => <CartButton /> }} />
      {isPending ? (
        <ActivityIndicator testID="products-loading" style={styles.center} />
      ) : !data ? (
        <View style={styles.center} testID="products-error">
          <Text style={styles.errorText}>Couldn't load the shop.</Text>
          <Pressable style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          testID="product-list"
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/product/[id]", params: { id: item.id } }}
              asChild
            >
              <Pressable testID={`product-${item.id}`} style={styles.card}>
                <View style={styles.tile}>
                  <Text style={styles.tileText}>{item.name[0]}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>{item.material}</Text>
                </View>
                <Text style={styles.price}>${item.price}</Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
  },
  tile: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E7F5EF",
    alignItems: "center",
    justifyContent: "center",
  },
  tileText: { fontSize: 20, fontWeight: "700", color: colors.accent },
  cardBody: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "600", color: colors.ink },
  meta: { fontSize: 13, color: colors.muted },
  price: { fontSize: 16, fontWeight: "700", color: colors.accent },
  cartButton: { padding: 4 },
  cartLabel: { fontSize: 16, fontWeight: "600", color: colors.accent },
  badge: {
    position: "absolute",
    top: -2,
    right: -6,
    backgroundColor: colors.accent,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: colors.accentText, fontSize: 11, fontWeight: "700" },
  errorText: { color: colors.danger, fontSize: 15 },
  retryButton: {
    backgroundColor: colors.accent,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryText: { color: colors.accentText, fontWeight: "600" },
});
