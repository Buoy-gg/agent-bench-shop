/**
 * Home modules, in render order. Each one warms its own cache on focus so the
 * screen behind it paints instantly when you tap through.
 */
export type HomeModule = {
  /** Cache namespace this module owns. */
  slug: string;
  title: string;
  /** Endpoint to prime from, when the module is backed by the API. */
  endpoint?: string;
  /** Send the session token (module reads customer-scoped data). */
  auth?: boolean;
};

export const HOME_MODULES: HomeModule[] = [
  { slug: "loyalty", title: "Points" },
  { slug: "recently-viewed", title: "Recently viewed" },
  { slug: "price-alerts", title: "Price alerts" },
  { slug: "announcements", title: "Store news" },
  { slug: "delivery-slots", title: "Delivery windows" },
  { slug: "coupons", title: "Your coupons" },
  { slug: "notifications", title: "Notifications" },
  { slug: "order-tracking", title: "Track a shipment" },
  { slug: "addresses", title: "Addresses" },
  { slug: "payment-methods", title: "Payment methods" },
  { slug: "returns", title: "Returns" },
  { slug: "gift-cards", title: "Gift cards" },
  { slug: "subscriptions", title: "Subscriptions" },
  { slug: "store-locator", title: "Nearby stores" },
  { slug: "review-drafts", title: "Draft reviews" },
  { slug: "bundles", title: "Bundles" },
  { slug: "warranties", title: "Warranties" },
  { slug: "assembly", title: "Assembly" },
  { slug: "invoices", title: "Invoices" },
  { slug: "support-tickets", title: "Support" },
  { slug: "faq", title: "Help" },
  { slug: "referrals", title: "Refer a friend" },
  { slug: "saved-carts", title: "Saved carts" },
  { slug: "comparisons", title: "Compare" },
  { slug: "size-guides", title: "Size guides" },
  { slug: "materials", title: "Materials" },
  { slug: "care-guides", title: "Care" },
  { slug: "showroom", title: "Showroom" },
  { slug: "trade-accounts", title: "Trade" },
  { slug: "quotes", title: "Quotes" },
  { slug: "tax-exemption", title: "Tax exemption" },
  { slug: "preferences", title: "Preferences" },
  { slug: "consent", title: "Privacy" },
  { slug: "experiments", title: "Experiments" },
  { slug: "waitlists", title: "Waitlists" },
  { slug: "bulk-order", title: "Bulk orders" },
  { slug: "financing", title: "Financing" },
  { slug: "donations", title: "Donations" },
  { slug: "packaging", title: "Packaging" },
  { slug: "carbon", title: "Delivery footprint" },
  { slug: "orders", title: "Your last order", endpoint: "/orders?limit=1", auth: true },
];
