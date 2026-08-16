export const reviewDraftsKeys = {
  all: () => ["review-drafts"] as const,
  detail: (id: string) => ["review-drafts", id] as const,
};
