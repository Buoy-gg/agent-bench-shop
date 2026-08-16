export const paymentMethodsKeys = {
  all: () => ["payment-methods"] as const,
  detail: (id: string) => ["payment-methods", id] as const,
};
