export const tradeAccountsKeys = {
  all: () => ["trade-accounts"] as const,
  detail: (id: string) => ["trade-accounts", id] as const,
};
