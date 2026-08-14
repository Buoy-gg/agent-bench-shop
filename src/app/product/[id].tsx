import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api, type Product } from "../../lib/api";
import { useCartStore } from "../../lib/cart-store";
import { useWishlistStore } from "../../lib/wishlist-store";
import { colors } from "../../lib/theme";

function ReviewsSection({ productId }: { productId: string }) {
  const { data: reviews } = useQuery({
    queryKey: ["products", productId, "reviews"],
    queryFn: () => api.getReviews(productId),
  });

  if (!reviews || reviews.length === 0) return null;

  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <View style={styles.reviews}>
      <Text style={styles.reviewAverage} testID="review-average">
        {"★".repeat(Math.max(1, Math.round(average)))} {average.toFixed(1)} out of 5 ·{" "}
        {reviews.length} reviews
      </Text>
      {reviews.slice(0, 3).map((review) => (
        <View key={review.id} style={styles.reviewRow} testID={`review-${review.id}`}>
          <Text style={styles.reviewAuthor}>
            {review.author} · {"★".repeat(Math.max(1, Math.round(review.rating)))}
          </Text>
          <Text style={styles.reviewBody}>{review.body}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const add = useCartStore((state) => state.add);
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const [justAdded, setJustAdded] = useState(false);
  const queryClient = useQueryClient();

  const { data: product, isPending, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => api.getProduct(id),
    enabled: Boolean(id),
    initialData: () =>
      queryClient
        .getQueryData<Product[]>(["products"])
        ?.find((item) => item.id === id),
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

  const saved = wishlistItems.some((item) => item.productId === product.id);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.screen}
      testID={`product-detail-${product.id}`}
    >
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
      <View style={styles.actions}>
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
        <Pressable
          testID="wishlist-toggle"
          style={[styles.saveButton, saved && styles.saveButtonActive]}
          onPress={() => toggleWishlist(product)}
        >
          <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
            {saved ? "♥ Saved" : "♡ Save"}
          </Text>
        </Pressable>
      </View>
      <ReviewsSection productId={product.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  screen: { padding: 24, alignItems: "center", gap: 8, paddingBottom: 48 },
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
  actions: { flexDirection: "row", gap: 10, marginTop: 16, alignItems: "center" },
  addButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  addButtonText: { color: colors.accentText, fontSize: 16, fontWeight: "600" },
  saveButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  saveButtonActive: { borderColor: colors.accent },
  saveButtonText: { fontSize: 15, fontWeight: "600", color: colors.ink },
  saveButtonTextActive: { color: colors.accent },
  reviews: {
    alignSelf: "stretch",
    marginTop: 28,
    gap: 12,
  },
  reviewAverage: { fontSize: 15, fontWeight: "700", color: colors.ink },
  reviewRow: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    gap: 4,
  },
  reviewAuthor: { fontSize: 13, fontWeight: "600", color: colors.muted },
  reviewBody: { fontSize: 14, color: colors.ink, lineHeight: 20 },
  errorText: { color: colors.danger, fontSize: 15 },
});
