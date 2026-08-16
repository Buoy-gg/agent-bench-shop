import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { assemblyApi } from "./api";
import { assemblyKeys } from "./keys";
import type { AssemblyBooking } from "./types";

/** Read the assembly appointments list. */
export function useAssembly() {
  return useQuery({
    queryKey: assemblyKeys.all(),
    queryFn: assemblyApi.list,
  });
}

/**
 * Warm the assembly cache so the screen paints instantly when it opens.
 * Called from the shop screen's strip.
 */
export function useWarmAssembly() {
  const queryClient = useQueryClient();
  return useCallback(
    async () => {
      const rows = await assemblyApi.list();
      queryClient.setQueryData(assemblyKeys.all(), rows);
      return rows as AssemblyBooking[];
    },
    [queryClient]
  );
}
