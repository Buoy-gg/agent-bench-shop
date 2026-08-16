import type { ExperimentFlag, ExperimentFlagSummary } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const experimentsApi = {
  list: () => read<ExperimentFlag[]>("/experiments"),
  /** The short list the home strip shows. */
  recent: (limit = 3) => read<ExperimentFlagSummary[]>(`/experiments?limit=${limit}`),
  detail: (id: string) => read<ExperimentFlag>(`/experiments/${id}`),
};
