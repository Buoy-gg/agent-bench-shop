export const referralsKeys = {
  all: () => ["referrals"] as const,
  detail: (id: string) => ["referrals", id] as const,
};
