import { StyleSheet, Switch, Text, View } from "react-native";

import { useSettingsStore } from "../lib/settings-store";
import { colors } from "../lib/theme";

function SettingRow({
  label,
  hint,
  value,
  onValueChange,
  testID,
}: {
  label: string;
  hint: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  testID: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowBody}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <Switch
        testID={testID}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: colors.accent }}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const orderUpdates = useSettingsStore((state) => state.orderUpdates);
  const marketingEmails = useSettingsStore((state) => state.marketingEmails);
  const showRecentSearches = useSettingsStore((state) => state.showRecentSearches);
  const setOrderUpdates = useSettingsStore((state) => state.setOrderUpdates);
  const setMarketingEmails = useSettingsStore((state) => state.setMarketingEmails);
  const setShowRecentSearches = useSettingsStore((state) => state.setShowRecentSearches);

  return (
    <View style={styles.screen}>
      <View style={styles.group}>
        <SettingRow
          testID="setting-order-updates"
          label="Order updates"
          hint="Status changes for orders you've placed."
          value={orderUpdates}
          onValueChange={setOrderUpdates}
        />
        <View style={styles.divider} />
        <SettingRow
          testID="setting-marketing"
          label="Deals and news"
          hint="Occasional promotions from the shop."
          value={marketingEmails}
          onValueChange={setMarketingEmails}
        />
        <View style={styles.divider} />
        <SettingRow
          testID="setting-recent-searches"
          label="Recent searches"
          hint="Keep a short history on the search screen."
          value={showRecentSearches}
          onValueChange={setShowRecentSearches}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  group: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  rowBody: { flex: 1, gap: 2 },
  label: { fontSize: 15, fontWeight: "600", color: colors.ink },
  hint: { fontSize: 13, color: colors.muted },
  divider: { height: 1, backgroundColor: colors.line, marginHorizontal: 16 },
});
