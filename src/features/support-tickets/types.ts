/** Ticket — support conversations. */
export type Ticket = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type TicketSummary = Pick<Ticket, "id" | "label">;
