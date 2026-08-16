/** Notification — push and in-app notices. */
export type Notification = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type NotificationSummary = Pick<Notification, "id" | "label">;
