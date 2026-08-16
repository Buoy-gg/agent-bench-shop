import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { FEATURES } from "../features";
import { colors } from "../lib/theme";

/** Directory of everything that isn't the main shopping path. */
export default function MoreScreen() {
  const [open, setOpen] = useState<string | null>(null);
  const active = FEATURES.find((f) => f.slug === open);

  if (active) {
    const Screen = active.Screen;
    return <Screen />;
  }

  return (
    <View style={styles.screen} testID="more-screen">
      <FlatList
        data={FEATURES}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <Pressable
            testID={`more-${item.slug}`}
            style={styles.row}
            onPress={() => setOpen(item.slug)}
          >
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  row: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  title: { fontSize: 15, color: colors.ink },
});
