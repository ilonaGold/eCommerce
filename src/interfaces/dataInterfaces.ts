export interface Address {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: Address[];
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
