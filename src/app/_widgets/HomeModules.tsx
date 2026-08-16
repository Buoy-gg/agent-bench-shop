import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ensureSession } from "../../lib/auth";
import { colors } from "../../lib/theme";
import { HOME_MODULES, type HomeModule } from "./registry";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

type Row = { id?: string; orderId?: string; label?: string; total?: number };

/**
 * One home module. Primes its own cache namespace on focus so the screen it
 * links to paints instantly, and shows a one-line summary of whatever came
 * back.
 */
function HomeModuleStrip({ module }: { module: HomeModule }) {
  const queryClient = useQueryClient();
  const [row, setRow] = useState<Row | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!module.endpoint) return;
      let cancelled = false;
      (async () => {
        try {
          const headers: Record<string, string> = {};
          if (module.auth) headers.Authorization = `Bearer ${await ensureSession()}`;
          const res = await fetch(`${API_URL}${module.endpoint}`, { headers });
          if (!res.ok || cancelled) return;
          const rows: Row[] = await res.json();
          setRow(rows[rows.length - 1] ?? null);
          queryClient.setQueryData([module.slug], rows);
        } catch {
          // A module that can't load is not worth interrupting the shop for.
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [module, queryClient])
  );

  if (!row) return null;
  const label = row.orderId ?? row.label ?? "";
  return (
    <View testID={`home-module-${module.slug}`} style={styles.strip}>
      <Text style={styles.label}>{module.title}</Text>
      <Text style={styles.value}>
        {label}
        {typeof row.total === "number" ? ` · $${row.total}` : ""}
      </Text>
    </View>
  );
}

/** Everything the shop screen shows above the product list. */
export function HomeModules() {
  return (
    <View>
      {HOME_MODULES.map((module) => (
        <HomeModuleStrip key={module.slug} module={module} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  label: { fontSize: 12, color: colors.muted },
  value: { fontSize: 15, fontWeight: "600", color: colors.ink },
});
