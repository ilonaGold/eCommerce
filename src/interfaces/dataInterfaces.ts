export interface AddressFormData {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface CustomerFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: AddressFormData[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

// Custom data model, we modeled inside "loginCustomer.ts"
export interface LoginInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  customer: Customer;
}

// -------------------------------------------------------------------------

export interface Customer {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  email: string;
  isEmailVerified: boolean;
  customerNumber?: string;
  key?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses?: Address[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  locale?: string;
  salutation?: string;
  externalId?: string;
  customerGroup?: Reference;
  custom?: CustomFields;
  authenticationMode?: "Password" | "ExternalAuth";
}

// Supporting interfaces
export interface Address {
  id?: string;
  key: string;
  country: string;
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
}

interface Reference {
  typeId: "customer-group" | "store" | string;
  id: string;
}

interface CustomFields {
  type: Reference;
  fields: Record<string, unknown>;
}
