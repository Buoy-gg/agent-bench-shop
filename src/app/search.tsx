import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "../lib/api";
import { useSettingsStore } from "../lib/settings-store";
import { keyFor, readJSON, writeJSON } from "../lib/storage";
import { colors } from "../lib/theme";

const RECENT_KEY = keyFor("recent");
const RECENT_LIMIT = 8;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const showRecentSearches = useSettingsStore((state) => state.showRecentSearches);

  useEffect(() => {
    readJSON<string[]>(RECENT_KEY)
      .then((saved) => {
        if (saved) setRecent(saved);
      })
      .catch(() => {});
  }, []);

  const runSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setSubmitted(trimmed);
    const next = [trimmed, ...recent.filter((t) => t !== trimmed)].slice(0, RECENT_LIMIT);
    setRecent(next);
    writeJSON(RECENT_KEY, next).catch(() => {});
  };

  const { data: results, isFetching } = useQuery({
    queryKey: ["search", submitted],
    queryFn: () => api.searchProducts(submitted),
    enabled: submitted.length > 0,
  });

  return (
    <View style={styles.screen}>
      <TextInput
        testID="search-input"
        style={styles.input}
        placeholder="Search the shop"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => runSearch(query)}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
      />
      {submitted.length === 0 ? (
        showRecentSearches ? (
          <View style={styles.recentWrap} testID="recent-searches">
            <Text style={styles.sectionLabel}>Recent searches</Text>
            <View style={styles.chips}>
              {recent.map((term, index) => (
                <Pressable
                  key={`${term}-${index}`}
                  testID={`recent-${index}`}
                  style={styles.chip}
                  onPress={() => runSearch(term)}
                >
                  <Text style={styles.chipText}>{term}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null
      ) : isFetching && !results ? (
        <ActivityIndicator testID="search-loading" style={styles.center} />
      ) : !results || results.length === 0 ? (
        <View style={styles.center} testID="search-empty">
          <Text style={styles.emptyText}>No benches match “{submitted}”.</Text>
        </View>
      ) : (
        <FlatList
          testID="search-results"
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/product/[id]", params: { id: item.id } }}
              asChild
            >
              <Pressable testID={`search-result-${item.id}`} style={styles.card}>
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
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  input: {
    margin: 16,
    marginBottom: 4,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  recentWrap: { paddingHorizontal: 16, paddingTop: 12, gap: 10 },
  sectionLabel: { fontSize: 13, fontWeight: "600", color: colors.muted },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { fontSize: 14, color: colors.ink },
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
  cardBody: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: "600", color: colors.ink },
  meta: { fontSize: 13, color: colors.muted },
  price: { fontSize: 16, fontWeight: "700", color: colors.accent },
  emptyText: { fontSize: 15, color: colors.muted },
});
