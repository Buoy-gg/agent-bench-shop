import type { CareGuide, CareGuideSummary } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const careGuidesApi = {
  list: () => read<CareGuide[]>("/care-guides"),
  /** The short list the home strip shows. */
  recent: (limit = 3) => read<CareGuideSummary[]>(`/care-guides?limit=${limit}`),
  detail: (id: string) => read<CareGuide>(`/care-guides/${id}`),
};
