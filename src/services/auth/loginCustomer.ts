import { CustomerAccessToken } from "../../interfaces/auth/authInterfaces";
import { LoginInfo } from "../../interfaces/dataInterfaces";

interface LoginWithCartBody {
  email: string;
  password: string;
  anonymousCartId?: string;
  anonymousCartSignInMode?: "MergeWithExistingCustomerCart" | "UseAsNewActiveCustomerCart";
}

export async function loginCustomer(
  email: string,
  password: string,
  anonymousCartId?: string,
  anonymousCartSignInMode: LoginWithCartBody["anonymousCartSignInMode"] = "MergeWithExistingCustomerCart"
): Promise<LoginInfo> {
  const authUrl = `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`;
  const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/login`;

  try {
    // obtain access token 'through password flow'
    const authResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password,
        scope: import.meta.env.VITE_CTP_SCOPES,
      }),
    });

    if (!authResponse.ok) {
      const responseData = await authResponse.json();
      console.log(responseData);
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
    // Auth Data:
    const authData: CustomerAccessToken = await authResponse.json();

    const loginBody: LoginWithCartBody = {
      email,
      password,
      ...(anonymousCartId ? { anonymousCartId, anonymousCartSignInMode } : {}),
    };

    // Log customer in, via the auth token.
    const loginResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginBody),
    });

    if (!loginResponse.ok) {
      const responseData = await loginResponse.json();
      console.log(responseData);
      throw new Error(responseData.message || JSON.stringify(responseData));
    }
    // Customer Data:
    const customerData = await loginResponse.json();

    // save token & customer-data
    const loginInfo = {
      accessToken: authData.access_token,
      refreshToken: authData.refresh_token,
      expiresAt: Date.now() + authData.expires_in * 1000,
      customer: customerData.customer,
      cart: customerData.cart,
    };
    return loginInfo;
  } catch (error) {
    throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
