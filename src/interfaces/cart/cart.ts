export interface Money {
  currencyCode: string; // e.g. "USD"
  centAmount: number; // amount in minor units (e.g. cents)
}

export interface CustomFields {
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string; // localized name or default locale
  sku: string;
  quantity: number;
  price: Money; // price per unit
  totalPrice: Money; // price * quantity
  discountedPrice?: Money;
  custom?: CustomFields;
}

export interface ShippingInfo {
  shippingMethodId: string;
  shippingMethodName: string;
  price: Money;
  taxRate?: number;
}

export interface Cart {
  id: string;
  version: number;
  anonymousId?: string;
  customerId?: string;
  createdAt: string; // ISO 8601 timestamp
  lastModifiedAt: string; // ISO 8601 timestamp
  currency: string;
  country?: string; // 2‑letter ISO country code
  locale?: string; // user locale
  lineItems: CartItem[];
  customLineItems?: CartItem[];
  totalPrice: Money;
  discountCodes?: string[];
  shippingAddressId?: string;
  billingAddressId?: string;
  shippingInfo?: ShippingInfo;
  customFields?: CustomFields;
}
