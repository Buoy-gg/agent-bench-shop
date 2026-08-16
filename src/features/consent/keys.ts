export const consentKeys = {
  all: () => ["consent"] as const,
  detail: (id: string) => ["consent", id] as const,
};
