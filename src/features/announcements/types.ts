/** Announcement — store announcements. */
export type Announcement = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type AnnouncementSummary = Pick<Announcement, "id" | "label">;
