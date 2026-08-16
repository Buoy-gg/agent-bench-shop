export const showroomKeys = {
  all: () => ["showroom"] as const,
  detail: (id: string) => ["showroom", id] as const,
};
