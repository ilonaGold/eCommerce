import { Customer, LoginInfo } from "./../../interfaces/dataInterfaces";
import { getLoginInfo } from "./../localStorage/localStorage";
import { refreshAccessToken } from "./refreshToken";

export const isCustomerLoggedIn = async (): Promise<{
  isTokenValid: boolean;
  customer: Customer | null;
}> => {
  const customerLoginStatus = { isTokenValid: false, customer: null };
  const basicAuthString = btoa(
    `${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`
  );

  // 1.
  const storedLoginInfo: LoginInfo | null = getLoginInfo();
  if (!storedLoginInfo) return customerLoginStatus;
  console.log(storedLoginInfo);

  // 2.
  let { accessToken } = storedLoginInfo;
  const { refreshToken, expiresAt } = storedLoginInfo;

  try {
    // 3.
    if (expiresAt <= Date.now()) {
      accessToken = await refreshAccessToken(refreshToken);
    } else {
      const introspectTokenResponse = await fetch(
        `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/introspect`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuthString}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            token: accessToken,
          }),
        }
      );
      const introspectedToken = await introspectTokenResponse.json();
      if (!introspectedToken.active) {
        accessToken = await refreshAccessToken(refreshToken);
      }
    }

    // 4.
    const getCustomerResponse = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!getCustomerResponse.ok) {
      const errorText = await getCustomerResponse.text();
      throw new Error(
        `Failed to fetch customer response: ${getCustomerResponse.status} ${getCustomerResponse.statusText} - ${errorText}`
      );
    }

    const customer = await getCustomerResponse.json();

    customerLoginStatus.isTokenValid = true;
    customerLoginStatus.customer = customer;

    return customerLoginStatus;
  } catch (error) {
    throw new Error(
      `Something went wrong ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
