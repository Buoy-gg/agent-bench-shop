export const supportTicketsKeys = {
  all: () => ["support-tickets"] as const,
  detail: (id: string) => ["support-tickets", id] as const,
};
