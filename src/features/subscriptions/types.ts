/** Subscription — recurring deliveries. */
export type Subscription = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type SubscriptionSummary = Pick<Subscription, "id" | "label">;
