import { BaseAccessToken } from "../../interfaces/auth/authInterfaces";

export const getAccessTokenData = async (): Promise<BaseAccessToken> => {
  try {
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

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(
        `Failed to fetch access token: ${authResponse.status} ${authResponse.statusText} - ${errorText}`
      );
    }

    const accessData: BaseAccessToken = await authResponse.json();

    return accessData;
  } catch (error) {
    throw new Error(
      `Couldn't get access token data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
