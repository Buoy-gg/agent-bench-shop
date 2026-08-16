export const sizeGuidesKeys = {
  all: () => ["size-guides"] as const,
  detail: (id: string) => ["size-guides", id] as const,
};
