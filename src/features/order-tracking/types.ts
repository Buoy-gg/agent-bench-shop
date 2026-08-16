/** Shipment — carrier tracking. */
export type Shipment = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type ShipmentSummary = Pick<Shipment, "id" | "label">;
