import { LoginInfo } from "../../interfaces/dataInterfaces";
import { CartService } from "../API/cart/cartService";

export async function loginCustomer(email: string, password: string): Promise<LoginInfo> {
  const authUrl = `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`;
  const apiUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/login`;

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
  const authData = await authResponse.json();

  // Log customer in, via the auth token.
  const loginResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authData.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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
  };

  // Transfer any anonymous cart data to the logged-in user
  try {
    await CartService.transferAnonymousCart();
  } catch (error) {
    console.error("Error transferring anonymous cart:", error);
    // Don't fail login if cart transfer fails
  }

  return loginInfo;
}
