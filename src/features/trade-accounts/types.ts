/** TradeAccount — business accounts. */
export type TradeAccount = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type TradeAccountSummary = Pick<TradeAccount, "id" | "label">;
