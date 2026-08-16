export const announcementsKeys = {
  all: () => ["announcements"] as const,
  detail: (id: string) => ["announcements", id] as const,
};
