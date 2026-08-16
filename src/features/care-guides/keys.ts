export const careGuidesKeys = {
  all: () => ["care-guides"] as const,
  detail: (id: string) => ["care-guides", id] as const,
};
