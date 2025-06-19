import { Address } from "../dataInterfaces";
import {
  LocalizedString,
  Price,
  ProductVariant,
  ProductTypeReference,
  TypedMoney,
  Reference,
} from "../products/ProductProjection";

import {
  CartDiscountReference,
  CreatedBy,
  CustomFields,
  CustomerReference,
  DirectDiscount,
  DiscountCodeInfo,
  DiscountTypeCombination,
  LastModifiedBy,
} from "../promo/promoInterfaces";

export interface Cart {
  id: string;
  version: number;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  customerGroup?: CustomerGroupReference;
  anonymousId?: string;
  businessUnit?: BusinessUnitKeyReference;
  store?: StoreKeyReference;
  lineItems: LineItem[];
  customLineItems: CustomLineItem[];
  totalLineItemQuantity?: number;
  totalPrice: CentPrecisionMoney;
  taxedPrice?: TaxedPrice;
  taxedShippingPrice?: TaxedPrice;
  discountOnTotalPrice?: DiscountOnTotalPrice;
  taxMode: TaxMode;
  taxRoundingMode: RoundingMode;
  taxCalculationMode: TaxCalculationMode;
  inventoryMode: InventoryMode;
  cartState: CartState;
  billingAddress?: Address;
  shippingAddress?: Address;
  shippingMode: ShippingMode;
  shippingKey?: string;
  shippingInfo?: ShippingInfo;
  shippingRateInput?: ShippingRateInput;
  shippingCustomFields?: CustomFields;
  shipping: Shipping[];
  itemShippingAddresses: Address[];
  discountCodes: DiscountCodeInfo[];
  directDiscounts: DirectDiscount[];
  refusedGifts: CartDiscountReference[];
  paymentInfo?: PaymentInfo;
  country?: string;
  locale?: string;
  origin: CartOrigin;
  discountTypeCombination?: DiscountTypeCombination;
  deleteDaysAfterLastModification?: number;
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface CustomerGroupReference {
  id: string;
  typeId: string;
  obj?: CustomerGroup;
}

interface CustomerGroup {
  id: string;
  version: number;
  key?: string;
  name: string;
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface BusinessUnitKeyReference {
  key: string;
  typeId: string;
}

interface StoreKeyReference {
  key: string;
  typeId: string;
}

interface LineItem {
  id: string;
  key?: string;
  productId: string;
  productKey?: string;
  name: LocalizedString;
  productSlug?: LocalizedString;
  productType: ProductTypeReference;
  variant: ProductVariant;
  price: Price;
  quantity: number;
  totalPrice: CentPrecisionMoney;
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions: MethodTaxedPrice[];
  state: ItemState[];
  taxRate?: TaxRate;
  perMethodTaxRate: MethodTaxRate[];
  supplyChannel?: ChannelReference;
  distributionChannel?: ChannelReference;
  priceMode: LineItemPriceMode;
  lineItemMode: LineItemMode;
  inventoryMode?: InventoryMode;
  shippingDetails?: ItemShippingDetails;
  addedAt?: string;
  custom?: CustomFields;
  lastModifiedAt?: string;
}

interface CustomLineItem {
  id: string;
  key?: string;
  name: LocalizedString;
  money: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions: MethodTaxedPrice[];
  totalPrice: CentPrecisionMoney;
  slug: string;
  quantity: number;
  state: ItemState[];
  taxCategory?: TaxCategoryReference;
  taxRate?: TaxRate;
  perMethodTaxRate: MethodTaxRate[];
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  shippingDetails?: ItemShippingDetails;
  priceMode: LineItemPriceMode;
  custom?: CustomFields;
}

interface DiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: DiscountedLineItemPrice;
}

interface DiscountedLineItemPrice {
  value: TypedMoney;
  includedDiscounts: DiscountedLineItemPortion[];
}

interface DiscountedLineItemPortion {
  discount: Reference;
  discountedAmount: TypedMoney;
}

interface DiscountOnTotalPrice {
  discountedAmount: TypedMoney;
  includedDiscounts: DiscountedTotalPricePortion[];
  discountedNetAmount?: TypedMoney;
  discountedGrossAmount?: TypedMoney;
}

interface DiscountedTotalPricePortion {
  discount: Reference;
  discountedAmount: TypedMoney;
}

interface CentPrecisionMoney {
  centAmount: number;
  currencyCode: string;
  type: "centPrecision" | "highPrecision";
  fractionDigits: number;
}

interface ChannelReference {
  id: string;
  typeId: string;
  obj?: Channel;
}

interface Channel {
  id: string;
  version: number;
  key: string;
  roles: string;
  name?: LocalizedString;
  description?: LocalizedString;
  address?: Address;
  reviewRatingStatistics?: ReviewRatingStatistics;
  geoLocation?: GeoJson;
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface ReviewRatingStatistics {
  averageRating: number;
  highestRating: number;
  lowestRating: number;
  count: number;
  ratingsDistribution: Record<number, number>;
}

interface GeoJson {
  type: "Point";
  coordinates: number[];
}

interface TaxedPrice {
  totalNet: CentPrecisionMoney;
  totalGross: CentPrecisionMoney;
  taxPortions: TaxPortion[];
  totalTax?: CentPrecisionMoney;
}

interface TaxedItemPrice {
  totalNet: CentPrecisionMoney;
  totalGross: CentPrecisionMoney;
  taxPortions: TaxPortion[];
  totalTax?: CentPrecisionMoney;
}

interface TaxPortion {
  name?: string;
  rate: number;
  amount: CentPrecisionMoney;
}

interface MethodTaxedPrice {
  shippingMethodKey: string;
  taxedPrice?: TaxedItemPrice;
}

interface MethodTaxRate {
  shippingMethodKey: string;
  taxRate?: TaxRate;
}

interface TaxRate {
  id?: string;
  key?: string;
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
  state?: string;
  subRates: SubRate[];
}

interface SubRate {
  name: string;
  amount: number;
}

interface TaxCategoryReference {
  id: string;
  typeId: string;
  obj?: TaxCategory;
}

interface TaxCategory {
  id: string;
  version: number;
  key?: string;
  name: string;
  description?: string;
  rates: TaxRate[];
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface ShippingInfo {
  shippingMethodName: string;
  price: CentPrecisionMoney;
  shippingRate: ShippingRate;
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  taxCategory?: TaxCategoryReference;
  shippingMethod?: ShippingMethodReference;
  deliveries?: Delivery[];
  discountedPrice?: DiscountedLineItemPrice;
  shippingMethodState: "DoesNotMatchCart" | "MatchesCart";
}

interface Shipping {
  shippingKey: string;
  shippingInfo: ShippingInfo;
  shippingAddress: Address;
  shippingRateInput?: ShippingRateInput;
  shippingCustomFields?: CustomFields;
}

interface ItemShippingDetails {
  targets: ItemShippingTarget[];
  valid: boolean;
}

interface ItemShippingTarget {
  addressKey: string;
  quantity: number;
  shippingMethodKey?: string;
}

interface ShippingRate {
  price: CentPrecisionMoney;
  freeAbove?: CentPrecisionMoney;
  isMatching?: boolean;
  tiers: ShippingRatePriceTier[];
}

type ShippingRatePriceTier = CartValueTier | CartClassificationTier | CartScoreTier;

interface CartValueTier {
  type: "CartValue";
  minimumCentAmount: number;
  price: Money;
  isMatching?: boolean;
}

interface Money {
  centAmount: number;
  currencyCode: string;
}

interface CartClassificationTier {
  type: "CartClassification";
  value: string;
  price: Money;
  isMatching?: boolean;
}

interface CartScoreTier {
  type: "CartScore";
  score: number;
  price?: Money;
  priceFunction?: PriceFunction;
  isMatching?: boolean;
}

interface PriceFunction {
  currencyCode: string;
  function: string;
}

interface ShippingMethodReference {
  id: string;
  typeId: string;
  obj?: ShippingMethod;
}

interface ShippingMethod {
  id: string;
  version: number;
  key?: string;
  name: string;
  localizedName?: LocalizedString;
  localizedDescription?: LocalizedString;
  taxCategory: TaxCategoryReference;
  zoneRates: ZoneRate[];
  active: boolean;
  isDefault: boolean;
  predicate?: string;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface ZoneRate {
  zone: ZoneReference;
  shippingRates: ShippingRate[];
}

interface ZoneReference {
  id: string;
  typeId: string;
  obj?: Zone;
}

interface Zone {
  id: string;
  version: number;
  key?: string;
  name: string;
  description?: string;
  locations: Location[];
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

type TaxMode = "Platform" | "External" | "ExternalAmount" | "Disabled";
type TaxCalculationMode = "LineItemLevel" | "UnitPriceLevel";
type RoundingMode = "HalfEven" | "HalfUp" | "HalfDown";
type InventoryMode = "None" | "TrackOnly" | "ReserveOnOrder";
type ShippingMode = "Single" | "Multiple";
type CartState = "Active" | "Merged" | "Ordered" | "Frozen";
type CartOrigin = "Customer" | "Merchant" | "Quote";
type LineItemPriceMode = "Platform" | "ExternalPrice" | "ExternalTotal";
type LineItemMode = "Standard" | "GiftLineItem";
type ShippingRateInput = ClassificationShippingRateInput | ScoreShippingRateInput;

interface ClassificationShippingRateInput {
  key: string;
  type: string;
  label: LocalizedString;
}

interface ScoreShippingRateInput {
  type: string;
  score: number;
}

interface ItemState {
  quantity: number;
  state: StateReference;
}

interface StateReference {
  id: string;
  typeId: string;
  obj?: State;
}

interface State {
  id: string;
  version: number;
  key: string;
  type: string;
  name?: LocalizedString;
  description?: LocalizedString;
  initial: boolean;
  builtIn: boolean;
  roles: string[];
  transitions: StateReference[];
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface PaymentInfo {
  payments: PaymentReference;
}

interface PaymentReference {
  id: string;
  typeId: string;
  obj?: Payment;
}

interface Payment {
  id: string;
  version: number;
  key?: string;
  customer?: CustomerReference;
  anonymousId?: string;
  interfaceId?: string;
  amountPlanned: CentPrecisionMoney;
  paymentMethodInfo: PaymentMethodInfo;
  paymentStatus: PaymentStatus;
  transactions: Transaction[];
  interfaceInteractions: CustomFields[];
  custom?: CustomFields;
  createdAt: string;
  createdBy?: CreatedBy;
  lastModifiedAt: string;
  lastModifiedBy?: LastModifiedBy;
}

interface PaymentMethodInfo {
  paymentInterface?: string;
  method?: string;
  name?: LocalizedString;
}

interface PaymentStatus {
  interfaceCode?: string;
  interfaceText?: string;
  state?: StateReference;
}

interface Transaction {
  id: string;
  timestamp?: string;
  type: string;
  amount: CentPrecisionMoney;
  interactionId?: string;
  state: "Initial" | "Pending" | "Success" | "Failure";
  custom?: CustomFields;
}

interface Delivery {
  id: string;
  key?: string;
  items: DeliveryItem[];
  parcels: Parcel[];
  address?: Address;
  custom?: CustomFields;
  createdAt: string;
}

interface DeliveryItem {
  id: string;
  quantity: number;
}

interface Parcel {
  id: string;
  key?: string;
  measurements?: ParcelMeasurements;
  trackingData?: TrackingData;
  items?: DeliveryItem[];
  custom?: CustomFields;
  createdAt: string;
}

interface ParcelMeasurements {
  heightInMillimeter?: number;
  lengthInMillimeter?: number;
  widthInMillimeter?: number;
  weightInGram?: number;
}

interface TrackingData {
  trackingId?: string;
  carrier?: string;
  provider?: string;
  providerTransaction?: string;
  isReturn?: boolean;
}
