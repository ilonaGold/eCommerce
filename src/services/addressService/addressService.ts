import { getState, setCustomer } from "../../state/state";
import { Customer } from "../../interfaces/dataInterfaces";
import { getLoginInfo } from "../localStorage/localStorage";
import countryCodes from "../../assets/data/countryCodes.json";

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
}): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    // Create address actions
    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "addAddress",
          address: {
            firstName: addressData.firstName.trim(),
            lastName: addressData.lastName.trim(),
            streetName: addressData.streetName.trim(),
            city: addressData.city.trim(),
            postalCode: addressData.postalCode.trim(),
            country: addressData.country.trim().toUpperCase(),
          } as Record<string, string>,
        },
      ],
    };

    // Only add additionalStreetInfo if it exists and is not empty
    if (addressData.additionalStreetInfo?.trim()) {
      requestBody.actions[0].address.additionalStreetInfo = addressData.additionalStreetInfo.trim();
    }

    console.log("Add address payload:", JSON.stringify(requestBody, null, 2));

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error("Full error response:", {
        status: response.status,
        statusText: response.statusText,
        body: responseData,
      });
      throw new Error(responseData.message || "Error adding address");
    }

    // Handle default address setting after adding if needed
    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer); // Update state immediately

    // Now set as default if requested (in separate API calls)
    if (addressData.defaultShipping || addressData.defaultBilling) {
      const addresses = updatedCustomer.addresses || [];
      if (addresses.length === 0) {
        throw new Error("New address was not created properly");
      }
      const newAddress = addresses[addresses.length - 1];

      if (addressData.defaultShipping) {
        await setDefaultShippingAddress(newAddress.id || "");
      }

      if (addressData.defaultBilling) {
        await setDefaultBillingAddress(newAddress.id || "");
      }

      // Get the customer again after all updates
      const finalCustomer = getState("customer") as Customer;
      return finalCustomer;
    }

    return updatedCustomer;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Update existing address
export async function updateAddress(
  addressId: string,
  addressData: {
    firstName: string;
    lastName: string;
    streetName: string;
    additionalStreetInfo?: string;
    city: string;
    postalCode: string;
    country: string;
    defaultShipping: boolean;
    defaultBilling: boolean;
  }
): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    // Validate country code (must be 2 letters)
    let isValidCountry = false;
    for (const item of countryCodes) {
      if (item.value === addressData.country) isValidCountry = true;
    }
    if (!isValidCountry) {
      console.error(`Invalid country code: "${addressData.country}"`);
      throw new Error("Please select a valid country");
    }
    // Create simple address object exactly as recommended
    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "changeAddress",
          addressId: addressId,
          address: {
            firstName: addressData.firstName.trim(),
            lastName: addressData.lastName.trim(),
            streetName: addressData.streetName.trim(),
            city: addressData.city.trim(),
            postalCode: addressData.postalCode.trim(),
            country: addressData.country.trim().toUpperCase(),
          } as Record<string, string>,
        },
      ],
    };

    // Only add additionalStreetInfo if it exists and is not empty
    if (addressData.additionalStreetInfo?.trim()) {
      requestBody.actions[0].address.additionalStreetInfo = addressData.additionalStreetInfo.trim();
    }

    console.log("Final request payload:", JSON.stringify(requestBody, null, 2));

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error("Full error response:", {
        status: response.status,
        statusText: response.statusText,
        body: responseData,
      });
      throw new Error(responseData.message || "Error updating address");
    }

    // Handle default address setting after updating if needed
    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer); // Update state immediately

    // Check if we need to update default address settings
    const isDefaultShipping = customer.defaultShippingAddressId === addressId;
    const isDefaultBilling = customer.defaultBillingAddressId === addressId;

    if (
      (addressData.defaultShipping && !isDefaultShipping) ||
      (addressData.defaultBilling && !isDefaultBilling) ||
      (!addressData.defaultShipping && isDefaultShipping) ||
      (!addressData.defaultBilling && isDefaultBilling)
    ) {
      // Handle removing default status if unchecked
      if (!addressData.defaultShipping && isDefaultShipping) {
        await removeDefaultShippingAddress();
      } else if (addressData.defaultShipping && !isDefaultShipping) {
        await setDefaultShippingAddress(addressId);
      }

      if (!addressData.defaultBilling && isDefaultBilling) {
        await removeDefaultBillingAddress();
      } else if (addressData.defaultBilling && !isDefaultBilling) {
        await setDefaultBillingAddress(addressId);
      }

      // Get the customer again after all updates
      const finalCustomer = getState("customer") as Customer;
      return finalCustomer;
    }

    return updatedCustomer;
  } catch (error) {
    console.error("Full update error:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Remove address
export async function removeAddress(addressId: string): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    // Create remove address action
    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "removeAddress",
          addressId: addressId,
        },
      ],
    };

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error removing address");
    }

    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error removing address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Set default shipping address
export async function setDefaultShippingAddress(addressId: string): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "setDefaultShippingAddress",
          addressId: addressId,
        },
      ],
    };

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error setting default shipping address");
    }

    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error setting default shipping address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Remove default shipping address
export async function removeDefaultShippingAddress(): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "setDefaultShippingAddress",
          addressId: null,
        },
      ],
    };

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error removing default shipping address");
    }

    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error removing default shipping address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Set default billing address
export async function setDefaultBillingAddress(addressId: string): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "setDefaultBillingAddress",
          addressId: addressId,
        },
      ],
    };

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error setting default billing address");
    }

    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error setting default billing address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Remove default billing address
export async function removeDefaultBillingAddress(): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;
    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Use login token instead of client credentials token
    const accessToken = getLoginInfo()?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication token not available");
    }

    const requestBody = {
      version: customer.version,
      actions: [
        {
          action: "setDefaultBillingAddress",
          addressId: null,
        },
      ],
    };

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Error removing default billing address");
    }

    const updatedCustomer = responseData as Customer;
    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error) {
    console.error("Error removing default billing address:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
