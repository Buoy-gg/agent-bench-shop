/** DeliverySlot — scheduled delivery windows. */
export type DeliverySlot = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type DeliverySlotSummary = Pick<DeliverySlot, "id" | "label">;
