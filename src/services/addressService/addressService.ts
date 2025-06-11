import { getState } from "../../state/state";
import { Customer } from "../../interfaces/dataInterfaces";

// Add new address
export async function addAddress(addressData: {
  firstName: string;
  lastName: string;
  streetName: string;
  additionalStreetInfo?: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShipping: boolean;
  defaultBilling: boolean;
}) {
  console.log(addressData);

  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // TO DO: The team will implement this to fetch a fresh token and make the API call
    // This should add an address to the customer and if specified, set it as default

    return null; // Return the updated customer
  } catch (error: unknown) {
    console.error("Error adding address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Update existing address
export async function updateAddress(addressData: {
  id: string;
  firstName: string;
  lastName: string;
  streetName: string;
  additionalStreetInfo?: string;
  city: string;
  postalCode: string;
  country: string;
  defaultShipping: boolean;
  defaultBilling: boolean;
}) {
  console.log(addressData);

  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // TO DO: implement functionality to update an existing address

    return null; // Return the updated customer
  } catch (error: unknown) {
    console.error("Error updating address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Remove address
export async function removeAddress(addressId: string) {
  console.log(addressId);

  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // TODO: to implement functionality remove an address

    return null; // Return the updated customer
  } catch (error: unknown) {
    console.error("Error removing address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Set address as default shipping
export async function setDefaultShippingAddress(addressId: string) {
  console.log(addressId);

  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // TODO: set default shipping address

    return null; // Return the updated customer
  } catch (error: unknown) {
    console.error("Error setting default shipping address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Set address as default billing
export async function setDefaultBillingAddress(addressId: string) {
  console.log(addressId);

  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // TODO: set default billing address

    return null; // Return the updated customer
  } catch (error: unknown) {
    console.error("Error setting default billing address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
