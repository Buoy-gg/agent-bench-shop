import type { Notification, NotificationSummary } from "./types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4600";

async function read<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with ${res.status}`);
  return res.json();
}

export const notificationsApi = {
  list: () => read<Notification[]>("/notifications"),
  /** The short list the home strip shows. */
  recent: (limit = 3) => read<NotificationSummary[]>(`/notifications?limit=${limit}`),
  detail: (id: string) => read<Notification>(`/notifications/${id}`),
};
