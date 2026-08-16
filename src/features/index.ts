import { AddressesScreen } from "./addresses/AddressesScreen";
import { PaymentMethodsScreen } from "./payment-methods/PaymentMethodsScreen";
import { ReturnsScreen } from "./returns/ReturnsScreen";
import { LoyaltyScreen } from "./loyalty/LoyaltyScreen";
import { CouponsScreen } from "./coupons/CouponsScreen";
import { GiftCardsScreen } from "./gift-cards/GiftCardsScreen";
import { SubscriptionsScreen } from "./subscriptions/SubscriptionsScreen";
import { StoreLocatorScreen } from "./store-locator/StoreLocatorScreen";
import { NotificationsScreen } from "./notifications/NotificationsScreen";
import { ReviewDraftsScreen } from "./review-drafts/ReviewDraftsScreen";
import { RecentlyViewedScreen } from "./recently-viewed/RecentlyViewedScreen";
import { PriceAlertsScreen } from "./price-alerts/PriceAlertsScreen";
import { BundlesScreen } from "./bundles/BundlesScreen";
import { WarrantiesScreen } from "./warranties/WarrantiesScreen";
import { AssemblyScreen } from "./assembly/AssemblyScreen";
import { DeliverySlotsScreen } from "./delivery-slots/DeliverySlotsScreen";
import { InvoicesScreen } from "./invoices/InvoicesScreen";
import { OrderTrackingScreen } from "./order-tracking/OrderTrackingScreen";
import { SupportTicketsScreen } from "./support-tickets/SupportTicketsScreen";
import { FaqScreen } from "./faq/FaqScreen";
import { ReferralsScreen } from "./referrals/ReferralsScreen";
import { SavedCartsScreen } from "./saved-carts/SavedCartsScreen";
import { ComparisonsScreen } from "./comparisons/ComparisonsScreen";
import { SizeGuidesScreen } from "./size-guides/SizeGuidesScreen";
import { MaterialsScreen } from "./materials/MaterialsScreen";
import { CareGuidesScreen } from "./care-guides/CareGuidesScreen";
import { ShowroomScreen } from "./showroom/ShowroomScreen";
import { TradeAccountsScreen } from "./trade-accounts/TradeAccountsScreen";
import { QuotesScreen } from "./quotes/QuotesScreen";
import { TaxExemptionScreen } from "./tax-exemption/TaxExemptionScreen";
import { PreferencesScreen } from "./preferences/PreferencesScreen";
import { ConsentScreen } from "./consent/ConsentScreen";
import { ExperimentsScreen } from "./experiments/ExperimentsScreen";
import { AnnouncementsScreen } from "./announcements/AnnouncementsScreen";
import { WaitlistsScreen } from "./waitlists/WaitlistsScreen";
import { BulkOrderScreen } from "./bulk-order/BulkOrderScreen";
import { FinancingScreen } from "./financing/FinancingScreen";
import { DonationsScreen } from "./donations/DonationsScreen";
import { PackagingScreen } from "./packaging/PackagingScreen";
import { CarbonScreen } from "./carbon/CarbonScreen";

/** Every secondary area of the shop, listed on the "More" screen. */
export const FEATURES = [
  { slug: "addresses", title: "saved delivery addresses", Screen: AddressesScreen },
  { slug: "payment-methods", title: "stored cards and wallets", Screen: PaymentMethodsScreen },
  { slug: "returns", title: "return requests and labels", Screen: ReturnsScreen },
  { slug: "loyalty", title: "points and tier status", Screen: LoyaltyScreen },
  { slug: "coupons", title: "promo codes", Screen: CouponsScreen },
  { slug: "gift-cards", title: "gift card balances", Screen: GiftCardsScreen },
  { slug: "subscriptions", title: "recurring deliveries", Screen: SubscriptionsScreen },
  { slug: "store-locator", title: "nearby stores and stock", Screen: StoreLocatorScreen },
  { slug: "notifications", title: "push and in-app notices", Screen: NotificationsScreen },
  { slug: "review-drafts", title: "unsubmitted reviews", Screen: ReviewDraftsScreen },
  { slug: "recently-viewed", title: "browse history", Screen: RecentlyViewedScreen },
  { slug: "price-alerts", title: "watched price drops", Screen: PriceAlertsScreen },
  { slug: "bundles", title: "product bundles", Screen: BundlesScreen },
  { slug: "warranties", title: "extended warranties", Screen: WarrantiesScreen },
  { slug: "assembly", title: "assembly appointments", Screen: AssemblyScreen },
  { slug: "delivery-slots", title: "scheduled delivery windows", Screen: DeliverySlotsScreen },
  { slug: "invoices", title: "downloadable invoices", Screen: InvoicesScreen },
  { slug: "order-tracking", title: "carrier tracking", Screen: OrderTrackingScreen },
  { slug: "support-tickets", title: "support conversations", Screen: SupportTicketsScreen },
  { slug: "faq", title: "help articles", Screen: FaqScreen },
  { slug: "referrals", title: "refer-a-friend", Screen: ReferralsScreen },
  { slug: "saved-carts", title: "carts kept for later", Screen: SavedCartsScreen },
  { slug: "comparisons", title: "side-by-side compares", Screen: ComparisonsScreen },
  { slug: "size-guides", title: "dimension guides", Screen: SizeGuidesScreen },
  { slug: "materials", title: "material spec sheets", Screen: MaterialsScreen },
  { slug: "care-guides", title: "care instructions", Screen: CareGuidesScreen },
  { slug: "showroom", title: "styled room shots", Screen: ShowroomScreen },
  { slug: "trade-accounts", title: "business accounts", Screen: TradeAccountsScreen },
  { slug: "quotes", title: "bulk quotes", Screen: QuotesScreen },
  { slug: "tax-exemption", title: "exemption certificates", Screen: TaxExemptionScreen },
  { slug: "preferences", title: "shopping preferences", Screen: PreferencesScreen },
  { slug: "consent", title: "privacy consents", Screen: ConsentScreen },
  { slug: "experiments", title: "A/B assignments", Screen: ExperimentsScreen },
  { slug: "announcements", title: "store announcements", Screen: AnnouncementsScreen },
  { slug: "waitlists", title: "back-in-stock signups", Screen: WaitlistsScreen },
  { slug: "bulk-order", title: "pallet orders", Screen: BulkOrderScreen },
  { slug: "financing", title: "pay-over-time offers", Screen: FinancingScreen },
  { slug: "donations", title: "round-up donations", Screen: DonationsScreen },
  { slug: "packaging", title: "packaging choices", Screen: PackagingScreen },
  { slug: "carbon", title: "delivery footprint", Screen: CarbonScreen },
] as const;

export type FeatureSlug = (typeof FEATURES)[number]["slug"];
