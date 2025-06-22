import { TypedMoney, LocalizedString } from "../products/ProductProjection";

// Core Cart interfaces for commercetools API

export interface Cart {
  id: string;
  version: number;
  customerId?: string;
  anonymousId?: string;
  lineItems: LineItem[];
  customLineItems: CustomLineItem[];
  totalPrice: TypedMoney;
  taxedPrice?: TaxedPrice;
  cartState: CartState;
  paymentInfo?: PaymentInfo;
  shippingInfo?: ShippingInfo;
  discountCodes: DiscountCodeInfo[];
  discountOnTotalPrice?: DiscountOnTotalPrice;
  custom?: CustomFields;
  shippingAddress?: Address;
  billingAddress?: Address;
  inventoryMode: InventoryMode;
  taxMode: TaxMode;
  taxRoundingMode: RoundingMode;
  taxCalculationMode: TaxCalculationMode;
  deleteDaysAfterLastModification?: number;
  refusedGifts: CartDiscountReference[];
  origin: CartOrigin;
  createdAt: string;
  lastModifiedAt: string;
  locale?: string;
  country?: string;
  totalLineItemQuantity?: number;
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

export interface LineItem {
  id: string;
  productId: string;
  productKey?: string;
  name: LocalizedString;
  productSlug?: LocalizedString;
  productType: ProductTypeReference;
  variant: ProductVariant;
  price: Price;
  quantity: number;
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  taxRate?: TaxRate;
  addedAt?: string;
  lastModifiedAt?: string;
  state: ItemState[];
  priceMode: LineItemPriceMode;
  lineItemMode: LineItemMode;
  custom?: CustomFields;
  shippingDetails?: ItemShippingDetails;
  totalPrice: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  perMethodTaxRate?: MethodTaxRate[];
  inventoryMode?: InventoryMode;
  supplyChannel?: ChannelReference;
  distributionChannel?: ChannelReference;
}

export interface CustomLineItem {
  id: string;
  name: LocalizedString;
  money: TypedMoney;
  slug: string;
  quantity: number;
  state: ItemState[];
  taxCategory?: TaxCategoryReference;
  taxRate?: TaxRate;
  discountedPricePerQuantity: DiscountedLineItemPriceForQuantity[];
  custom?: CustomFields;
  shippingDetails?: ItemShippingDetails;
  priceMode: CustomLineItemPriceMode;
  totalPrice: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  perMethodTaxRate?: MethodTaxRate[];
}

export interface CartDraft {
  currency: string;
  customerId?: string;
  anonymousId?: string;
  country?: string;
  inventoryMode?: InventoryMode;
  taxMode?: TaxMode;
  taxRoundingMode?: RoundingMode;
  taxCalculationMode?: TaxCalculationMode;
  lineItems?: LineItemDraft[];
  customLineItems?: CustomLineItemDraft[];
  shippingAddress?: Address;
  billingAddress?: Address;
  shippingMethod?: ShippingMethodReference;
  custom?: CustomFields;
  locale?: string;
  deleteDaysAfterLastModification?: number;
  origin?: CartOrigin;
  discountCodes?: string[];
}

export interface LineItemDraft {
  productId?: string;
  productKey?: string;
  variantId?: number;
  sku?: string;
  quantity?: number;
  addedAt?: string;
  distributionChannel?: ChannelReference;
  supplyChannel?: ChannelReference;
  custom?: CustomFields;
  shippingDetails?: ItemShippingDetailsDraft;
}

export interface CustomLineItemDraft {
  name: LocalizedString;
  quantity?: number;
  money: Money;
  slug: string;
  taxCategory?: TaxCategoryReference;
  custom?: CustomFields;
  shippingDetails?: ItemShippingDetailsDraft;
  priceMode?: CustomLineItemPriceMode;
}

// Cart Update Actions
export interface CartUpdateAction {
  action: string;
}

export interface AddLineItemAction extends CartUpdateAction {
  action: "addLineItem";
  productId?: string;
  variantId?: number;
  sku?: string;
  quantity?: number;
  supplyChannel?: ChannelReference;
  distributionChannel?: ChannelReference;
  custom?: CustomFields;
  addedAt?: string;
  shippingDetails?: ItemShippingDetailsDraft;
}

export interface RemoveLineItemAction extends CartUpdateAction {
  action: "removeLineItem";
  lineItemId?: string;
  lineItemKey?: string;
  quantity?: number;
  externalPrice?: Money;
  externalTotalPrice?: ExternalLineItemTotalPrice;
  shippingDetailsToRemove?: ItemShippingDetailsDraft;
}

export interface ChangeLineItemQuantityAction extends CartUpdateAction {
  action: "changeLineItemQuantity";
  lineItemId?: string;
  lineItemKey?: string;
  quantity: number;
  externalPrice?: Money;
  externalTotalPrice?: ExternalLineItemTotalPrice;
}

export interface AddDiscountCodeAction extends CartUpdateAction {
  action: "addDiscountCode";
  code: string;
}

export interface RemoveDiscountCodeAction extends CartUpdateAction {
  action: "removeDiscountCode";
  discountCode: DiscountCodeReference;
}

export interface SetShippingAddressAction extends CartUpdateAction {
  action: "setShippingAddress";
  address?: Address;
}

export interface SetBillingAddressAction extends CartUpdateAction {
  action: "setBillingAddress";
  address?: Address;
}

export interface SetCountryAction extends CartUpdateAction {
  action: "setCountry";
  country?: string;
}

export interface SetLocaleAction extends CartUpdateAction {
  action: "setLocale";
  locale?: string;
}

export interface ApplyDeltaToLineItemShippingDetailsTargetsAction extends CartUpdateAction {
  action: "applyDeltaToLineItemShippingDetailsTargets";
  lineItemId?: string;
  lineItemKey?: string;
  targetsDelta: ItemShippingTarget[];
}

// Supporting interfaces and types

export type CartState = "Active" | "Merged" | "Ordered" | "Frozen";
export type CartOrigin = "Customer" | "Merchant";
export type InventoryMode = "None" | "TrackOnly" | "ReserveOnOrder";
export type TaxMode = "Platform" | "External" | "ExternalAmount" | "Disabled";
export type RoundingMode = "HalfEven" | "HalfUp" | "HalfDown";
export type TaxCalculationMode = "LineItemLevel" | "UnitPriceLevel";
export type LineItemPriceMode = "Platform" | "ExternalPrice" | "ExternalTotal";
export type LineItemMode = "Standard" | "GiftLineItem";
export type CustomLineItemPriceMode = "Standard" | "External";

export interface ProductTypeReference {
  typeId: "product-type";
  id: string;
  obj?: ProductType;
}

export interface ProductType {
  id: string;
  version: number;
  name: string;
  description?: string;
  classifier: string;
  attributes?: AttributeDefinition[];
}

export interface AttributeDefinition {
  type: AttributeType;
  name: string;
  label: LocalizedString;
  isRequired: boolean;
  attributeConstraint?: AttributeConstraint;
  inputTip?: LocalizedString;
  inputHint?: TextInputHint;
  isSearchable?: boolean;
}

export interface AttributeType {
  name: string;
}

export type AttributeConstraint = "None" | "Unique" | "CombinationUnique" | "SameForAll";
export type TextInputHint = "SingleLine" | "MultiLine";

export interface ProductVariant {
  id: number;
  sku?: string;
  key?: string;
  prices?: Price[];
  attributes?: Attribute[];
  price?: Price;
  images?: Image[];
  assets?: Asset[];
  availability?: ProductVariantAvailability;
  isMatchingVariant?: boolean;
  scopedPrice?: ScopedPrice;
  scopedPriceDiscounted?: boolean;
}

export interface Price {
  id?: string;
  value: TypedMoney;
  country?: string;
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
  tiers?: PriceTier[];
}

export interface Attribute {
  name: string;
  value: unknown;
}

export interface Image {
  url: string;
  label?: string;
  dimensions: AssetDimensions;
}

export interface Asset {
  id: string;
  sources: AssetSource[];
  name: LocalizedString;
  description?: LocalizedString;
  tags?: string[];
  custom?: CustomFields;
  key?: string;
}

export interface AssetSource {
  uri: string;
  key?: string;
  dimensions?: AssetDimensions;
  contentType?: string;
}

export interface AssetDimensions {
  w: number;
  h: number;
}

export interface ProductVariantAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  id?: string;
  version?: number;
  channels?: {
    [key: string]: ProductVariantChannelAvailability;
  };
}

export interface ProductVariantChannelAvailability {
  isOnStock?: boolean;
  restockableInDays?: number;
  availableQuantity?: number;
  id?: string;
  version?: number;
}

export interface ScopedPrice {
  id?: string;
  value: TypedMoney;
  currentValue: TypedMoney;
  country?: string;
  customerGroup?: CustomerGroupReference;
  channel?: ChannelReference;
  validFrom?: string;
  validUntil?: string;
  discounted?: DiscountedPrice;
  custom?: CustomFields;
}

export interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

export interface ProductDiscountReference {
  typeId: "product-discount";
  id: string;
  obj?: ProductDiscount;
}

export interface ProductDiscount {
  id: string;
  version: number;
  name: LocalizedString;
  key?: string;
  description?: LocalizedString;
  value: ProductDiscountValue;
  predicate: string;
  sortOrder: string;
  isActive: boolean;
  references: Reference[];
  validFrom?: string;
  validUntil?: string;
}

export interface ProductDiscountValue {
  type: string;
  permyriad?: number;
  money?: TypedMoney[];
}

export interface Reference {
  typeId: string;
  id: string;
}

export interface PriceTier {
  minimumQuantity: number;
  value: TypedMoney;
}

export interface CustomerGroupReference {
  typeId: "customer-group";
  id: string;
  obj?: CustomerGroup;
}

export interface CustomerGroup {
  id: string;
  version: number;
  name: string;
  key?: string;
  custom?: CustomFields;
}

export interface ChannelReference {
  typeId: "channel";
  id: string;
  obj?: Channel;
}

export interface Channel {
  id: string;
  version: number;
  key?: string;
  roles: ChannelRole[];
  name?: LocalizedString;
  description?: LocalizedString;
  address?: Address;
  custom?: CustomFields;
  geoLocation?: GeoLocation;
}

export type ChannelRole =
  | "InventorySupply"
  | "ProductDistribution"
  | "OrderExport"
  | "OrderImport"
  | "Primary";

export interface GeoLocation {
  type: "Point";
  coordinates: [number, number];
}

export interface Address {
  id?: string;
  key?: string;
  title?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  state?: string;
  country: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
  custom?: CustomFields;
}

export interface TaxedPrice {
  totalNet: TypedMoney;
  totalGross: TypedMoney;
  taxPortions: TaxPortion[];
  totalTax: TypedMoney;
}

export interface TaxPortion {
  rate: number;
  amount: TypedMoney;
  name?: string;
}

export interface PaymentInfo {
  payments: PaymentReference[];
}

export interface PaymentReference {
  typeId: "payment";
  id: string;
  obj?: Payment;
}

export interface Payment {
  id: string;
  version: number;
  customer?: CustomerReference;
  anonymousId?: string;
  interfaceId?: string;
  amountPlanned: TypedMoney;
  amountAuthorized?: TypedMoney;
  authorizedUntil?: string;
  amountPaid?: TypedMoney;
  amountRefunded?: TypedMoney;
  paymentMethodInfo: PaymentMethodInfo;
  custom?: CustomFields;
  paymentStatus: PaymentStatus;
  transactions: Transaction[];
  interfaceInteractions: CustomFields[];
}

export interface CustomerReference {
  typeId: "customer";
  id: string;
  obj?: Customer;
}

export interface Customer {
  id: string;
  version: number;
  customerNumber?: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses: Address[];
  defaultShippingAddressId?: string;
  shippingAddressIds: string[];
  defaultBillingAddressId?: string;
  billingAddressIds: string[];
  isEmailVerified: boolean;
  customerGroup?: CustomerGroupReference;
  custom?: CustomFields;
  locale?: string;
  salutation?: string;
  key?: string;
  stores: StoreKeyReference[];
  authenticationMode: AuthenticationMode;
}

export interface StoreKeyReference {
  typeId: "store";
  key: string;
}

export type AuthenticationMode = "Password" | "ExternalAuth";

export interface PaymentMethodInfo {
  paymentInterface?: string;
  method?: string;
  name?: LocalizedString;
}

export interface PaymentStatus {
  interfaceCode?: string;
  interfaceText?: string;
  state?: StateReference;
}

export interface StateReference {
  typeId: "state";
  id: string;
  obj?: State;
}

export interface State {
  id: string;
  version: number;
  key?: string;
  type: StateType;
  name?: LocalizedString;
  description?: LocalizedString;
  initial: boolean;
  builtIn: boolean;
  roles?: StateRole[];
  transitions?: StateReference[];
}

export type StateType =
  | "OrderState"
  | "LineItemState"
  | "ProductState"
  | "ReviewState"
  | "PaymentState";
export type StateRole = "ReviewIncludedInStatistics" | "Return";

export interface Transaction {
  id: string;
  timestamp?: string;
  type: TransactionType;
  amount: TypedMoney;
  interactionId?: string;
  state: TransactionState;
  custom?: CustomFields;
}

export type TransactionType =
  | "Authorization"
  | "CancelAuthorization"
  | "Charge"
  | "Refund"
  | "Chargeback";
export type TransactionState = "Pending" | "Success" | "Failure";

export interface ShippingInfo {
  shippingMethodName: string;
  price: TypedMoney;
  shippingRate: ShippingRate;
  taxedPrice?: TaxedItemPrice;
  taxRate?: TaxRate;
  taxCategory?: TaxCategoryReference;
  shippingMethod?: ShippingMethodReference;
  deliveries: Delivery[];
  discountedPrice?: DiscountedLineItemPrice;
  shippingMethodState: ShippingMethodState;
}

export interface ShippingRate {
  price: TypedMoney;
  freeAbove?: TypedMoney;
  tiers: ShippingRatePriceTier[];
  isMatching?: boolean;
}

export interface ShippingRatePriceTier {
  type: string;
  value?: TypedMoney;
  minimum?: TypedMoney;
  price?: TypedMoney;
  isMatching?: boolean;
}

export interface TaxedItemPrice {
  totalNet: TypedMoney;
  totalGross: TypedMoney;
  totalTax: TypedMoney;
  taxPortions: TaxPortion[];
}

export interface TaxRate {
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
  state?: string;
  id?: string;
  subRates?: SubRate[];
}

export interface SubRate {
  name: string;
  amount: number;
}

export interface TaxCategoryReference {
  typeId: "tax-category";
  id: string;
  obj?: TaxCategory;
}

export interface TaxCategory {
  id: string;
  version: number;
  name: string;
  description?: string;
  rates: TaxRate[];
  key?: string;
}

export interface ShippingMethodReference {
  typeId: "shipping-method";
  id: string;
  obj?: ShippingMethod;
}

export interface ShippingMethod {
  id: string;
  version: number;
  name: string;
  localizedName?: LocalizedString;
  description?: string;
  localizedDescription?: LocalizedString;
  taxCategory?: TaxCategoryReference;
  zoneRates: ZoneRate[];
  isDefault: boolean;
  predicate?: string;
  custom?: CustomFields;
  key?: string;
}

export interface ZoneRate {
  zone: ZoneReference;
  shippingRates: ShippingRate[];
}

export interface ZoneReference {
  typeId: "zone";
  id: string;
  obj?: Zone;
}

export interface Zone {
  id: string;
  version: number;
  name: string;
  description?: string;
  locations: Location[];
  key?: string;
}

export interface Location {
  country: string;
  state?: string;
}

export interface Delivery {
  id: string;
  items: DeliveryItem[];
  parcels: Parcel[];
  address?: Address;
  custom?: CustomFields;
}

export interface DeliveryItem {
  id: string;
  quantity: number;
}

export interface Parcel {
  id: string;
  measurements?: ParcelMeasurements;
  trackingData?: TrackingData;
  items?: DeliveryItem[];
  custom?: CustomFields;
}

export interface ParcelMeasurements {
  heightInMillimeter?: number;
  lengthInMillimeter?: number;
  widthInMillimeter?: number;
  weightInGram?: number;
}

export interface TrackingData {
  trackingId?: string;
  carrier?: string;
  provider?: string;
  providerTransaction?: string;
  isReturn?: boolean;
}

export interface DiscountedLineItemPrice {
  value: TypedMoney;
  includedDiscounts: DiscountedLineItemPortion[];
}

export interface DiscountedLineItemPortion {
  discount: CartDiscountReference;
  discountedAmount: TypedMoney;
}

export interface CartDiscountReference {
  typeId: "cart-discount";
  id: string;
  obj?: CartDiscount;
}

export interface CartDiscount {
  id: string;
  version: number;
  name: LocalizedString;
  key?: string;
  description?: LocalizedString;
  value: CartDiscountValue;
  cartPredicate: string;
  target?: CartDiscountTarget;
  sortOrder: string;
  stores: StoreKeyReference[];
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  requiresDiscountCode: boolean;
  references: Reference[];
  stackingMode: StackingMode;
  custom?: CustomFields;
}

export interface CartDiscountValue {
  type: string;
  permyriad?: number;
  money?: TypedMoney;
}

export interface CartDiscountTarget {
  type: string;
  predicate?: string;
}

export type StackingMode = "Stacking" | "StopAfterThisDiscount";

export type ShippingMethodState = "DoesNotMatchCart" | "MatchesCart";

export interface DiscountCodeInfo {
  discountCode: DiscountCodeReference;
  state?: DiscountCodeState;
}

export interface DiscountCodeReference {
  typeId: "discount-code";
  id: string;
  obj?: DiscountCode;
}

export interface DiscountCode {
  id: string;
  version: number;
  name?: LocalizedString;
  description?: LocalizedString;
  code: string;
  cartDiscounts: CartDiscountReference[];
  cartPredicate?: string;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  validityCheckTime?: string;
  maxApplications?: number;
  maxApplicationsPerCustomer?: number;
  custom?: CustomFields;
  groups: string[];
  references: Reference[];
}

export type DiscountCodeState =
  | "NotActive"
  | "NotValid"
  | "DoesNotMatchCart"
  | "MatchesCart"
  | "MaxApplicationReached"
  | "ApplicationStoppedByPreviousDiscount";

export interface CustomFields {
  type: TypeReference;
  fields: FieldContainer;
}

export interface TypeReference {
  typeId: "type";
  id: string;
  obj?: Type;
}

export interface Type {
  id: string;
  version: number;
  name: LocalizedString;
  description?: LocalizedString;
  resourceTypeIds: string[];
  fieldDefinitions: FieldDefinition[];
  key?: string;
}

export interface FieldDefinition {
  type: FieldType;
  name: string;
  label: LocalizedString;
  required: boolean;
  inputHint?: TypeTextInputHint;
}

export interface FieldType {
  name: string;
}

export type TypeTextInputHint = "SingleLine" | "MultiLine";

export interface FieldContainer {
  [fieldName: string]: unknown;
}

export interface DiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: DiscountedLineItemPrice;
}

export interface ItemState {
  quantity: number;
  state: StateReference;
}

export interface ItemShippingDetails {
  targets: ItemShippingTarget[];
  valid: boolean;
}

export interface ItemShippingTarget {
  addressKey: string;
  quantity: number;
  shippingMethodKey?: string;
}

export interface ItemShippingDetailsDraft {
  targets: ItemShippingTarget[];
}

export interface MethodTaxRate {
  shippingMethodKey: string;
  taxRate?: TaxRate;
}

export interface Money {
  currencyCode: string;
  centAmount: number;
  type?: "centPrecision";
  fractionDigits?: number;
}

export interface ExternalLineItemTotalPrice {
  price: Money;
  totalPrice: Money;
}

// Response types
export interface MyCartQueryResponse {
  statusCode: number;
  body: Cart;
}

export interface MyCartUpdateResponse {
  statusCode: number;
  body: Cart;
}

export interface CartPagedQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  results: Cart[];
}
