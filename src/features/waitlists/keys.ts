export const waitlistsKeys = {
  all: () => ["waitlists"] as const,
  detail: (id: string) => ["waitlists", id] as const,
};
