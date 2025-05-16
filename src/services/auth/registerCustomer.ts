import { notificationModal } from "../../components/notificationModal/notificationModal";
import { Customer } from "../../interfaces/dataInterfaces";
import { setAuth } from "../../state/state";

export async function registerCustomer(customerDraft: Customer): Promise<void> {
  console.log(customerDraft);
  const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers`;

  try {
    // obtain temp token
    const authResponse = await fetch(`${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: import.meta.env.VITE_CTP_SCOPES,
      }),
    });

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    console.log(accessToken);

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
    setAuth(true);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      notificationModal(error.message, "error");
    } else {
      console.log(error);
    }
  }
}
