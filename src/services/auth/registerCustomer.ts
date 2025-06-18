import { notificationModal } from "../../components/notificationModal/notificationModal";
import { CustomerFormData } from "../../interfaces/dataInterfaces";
import { getAccessTokenData } from "./getAccessTokenData";

export async function registerCustomer(customerDraft: CustomerFormData): Promise<void> {
  console.log(customerDraft);
  const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers`;

  try {
    // obtain auth token
    const authData = await getAccessTokenData();
    const accessToken = authData.access_token;

    // create the customer
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerDraft),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    notificationModal("Customer created successfully", "success");
    // const data = await response.json();
  } catch (error) {
    throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
