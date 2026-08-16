import type { Announcement, AnnouncementSummary } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const announcementsApi = {
  list: () => read<Announcement[]>("/announcements"),
  /** The short list the home strip shows. */
  recent: (limit = 3) => read<AnnouncementSummary[]>(`/announcements?limit=${limit}`),
  detail: (id: string) => read<Announcement>(`/announcements/${id}`),
};
