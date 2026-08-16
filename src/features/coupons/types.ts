/** Coupon — promo codes. */
export type Coupon = {
  id: string;
  label: string;
  detail?: string;
  updatedAt: number;
};

export type CouponSummary = Pick<Coupon, "id" | "label">;
