import { getAccessTokenData } from "./getAccessTokenData";

/**
 * Get customer access token with auto-refresh functionality
 * Retrieves token from localStorage, and refreshes if needed
 */
export async function getCustomerAccessToken(): Promise<string> {
  const loginInfo = localStorage.getItem("redpandaUser");

  if (!loginInfo) {
    throw new Error("No customer login information found. Please log in again.");
  }

  try {
    const { accessToken, refreshToken, expiresAt } = JSON.parse(loginInfo);

    // Check if token is expired or will expire soon (within 5 minutes)
    const now = Date.now();
    const expirationTime = new Date(expiresAt).getTime();
    const fiveMinutes = 5 * 60 * 1000;

    if (now >= expirationTime - fiveMinutes) {
      // Token is expired or will expire soon, refresh it
      console.log("Customer token expired or expiring soon, refreshing...");
      return await refreshCustomerToken(refreshToken);
    }

    return accessToken;
  } catch (error) {
    console.error("Error parsing customer login info:", error);
    throw new Error("Invalid customer login information. Please log in again.");
  }
}

/**
 * Refresh customer access token using refresh token
 */
async function refreshCustomerToken(refreshToken: string): Promise<string> {
  try {
    const clientTokenData = await getAccessTokenData();

    const response = await fetch(`${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${clientTokenData.access_token}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token refresh failed: ${response.status} ${errorText}`);
    }

    const tokenData = await response.json();

    // Update localStorage with new token data
    const newLoginInfo = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
    };

    localStorage.setItem("redpandaUser", JSON.stringify(newLoginInfo));

    return tokenData.access_token;
  } catch (error) {
    console.error("Error refreshing customer token:", error);
    // Clear invalid token data
    localStorage.removeItem("redpandaUser");
    throw new Error("Failed to refresh customer token. Please log in again.");
  }
}
