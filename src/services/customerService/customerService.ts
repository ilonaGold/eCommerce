import { getState, setCustomer } from "../../state/state";
import { Customer } from "../../interfaces/dataInterfaces";

// Add this import at the top:
import { getAccessTokenData } from "../auth/getAccessTokenData";
import { getLoginInfo } from "../localStorage/localStorage";

// Update customer information
export async function updateCustomerInfo(customerData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
}): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;

    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Prepare actions for updating the customer
    const actions = [];

    if (customerData.firstName && customerData.firstName !== customer.firstName) {
      actions.push({ action: "setFirstName", firstName: customerData.firstName });
    }

    if (customerData.lastName && customerData.lastName !== customer.lastName) {
      actions.push({ action: "setLastName", lastName: customerData.lastName });
    }

    if (customerData.email && customerData.email !== customer.email) {
      actions.push({ action: "changeEmail", email: customerData.email });
    }

    if (customerData.dateOfBirth && customerData.dateOfBirth !== customer.dateOfBirth) {
      actions.push({ action: "setDateOfBirth", dateOfBirth: customerData.dateOfBirth });
    }

    // Only make API call if there are changes
    if (actions.length > 0) {
      // Get a fresh token
      const accessToken = getLoginInfo()?.accessToken;

      const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          version: customer.version,
          actions,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Error updating customer");
      }

      const updatedCustomer = responseData as Customer;
      setCustomer(updatedCustomer);
      return updatedCustomer;
    }

    return customer;
  } catch (error: unknown) {
    console.error("Error updating customer:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Change customer password
export async function changeCustomerPassword(
  currentPassword: string,
  newPassword: string
): Promise<Customer> {
  try {
    const customer = getState("customer") as Customer;

    if (!customer || !customer.id || !customer.version) {
      throw new Error("Customer data not available");
    }

    // Get a fresh token
    const accessToken = getLoginInfo()?.accessToken;
    console.log(accessToken);

    const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/password`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        version: customer.version,
        currentPassword,
        newPassword,
      }),
    });

    // Fix: Read the response body only once
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error changing password");
    }

    const updatedCustomer = responseData as Customer;

    setCustomer(updatedCustomer);
    return updatedCustomer;
  } catch (error: unknown) {
    console.error("Error changing password:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
