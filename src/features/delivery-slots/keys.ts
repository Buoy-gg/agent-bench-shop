export const deliverySlotsKeys = {
  all: () => ["delivery-slots"] as const,
  detail: (id: string) => ["delivery-slots", id] as const,
};
