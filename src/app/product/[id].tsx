import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { api } from "../../lib/api";
import { useCartStore } from "../../lib/cart-store";
import { colors } from "../../lib/theme";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const add = useCartStore((state) => state.add);
  const [justAdded, setJustAdded] = useState(false);

  const { data: product, isPending, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => api.getProduct(id),
    enabled: Boolean(id),
  });

  if (isPending) {
    return <ActivityIndicator testID="product-loading" style={styles.center} />;
  }

  if (isError || !product) {
    return (
      <View style={styles.center} testID="product-error">
        <Text style={styles.errorText}>Couldn't load this bench.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen} testID={`product-detail-${product.id}`}>
      <Stack.Screen options={{ title: product.name }} />
      <View style={styles.tile}>
        <Text style={styles.tileText}>{product.name[0]}</Text>
      </View>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.meta}>{product.material}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price} testID="product-price">
        ${product.price}
      </Text>
      <Pressable
        testID="add-to-cart"
        style={styles.addButton}
        onPress={() => {
          add(product);
          setJustAdded(true);
        }}
      >
        <Text style={styles.addButtonText}>
          {justAdded ? "Added ✓ — add another" : "Add to cart"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, alignItems: "center", gap: 8 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  tile: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: "#E7F5EF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  tileText: { fontSize: 44, fontWeight: "700", color: colors.accent },
  name: { fontSize: 24, fontWeight: "700", color: colors.ink, marginTop: 8 },
  meta: { fontSize: 14, color: colors.muted },
  description: {
    fontSize: 15,
    color: colors.ink,
    textAlign: "center",
    lineHeight: 22,
    marginTop: 12,
  },
  price: { fontSize: 28, fontWeight: "800", color: colors.accent, marginTop: 16 },
  addButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 16,
  },
  addButtonText: { color: colors.accentText, fontSize: 16, fontWeight: "600" },
  errorText: { color: colors.danger, fontSize: 15 },
});
