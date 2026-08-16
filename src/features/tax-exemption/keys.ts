export const taxExemptionKeys = {
  all: () => ["tax-exemption"] as const,
  detail: (id: string) => ["tax-exemption", id] as const,
};
