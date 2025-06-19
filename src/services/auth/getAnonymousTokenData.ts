import { AnonymousAccessToken } from "../../interfaces/auth/authInterfaces";

export const getAnonymousTokenData = async (): Promise<AnonymousAccessToken> => {
  try {
    const authResponse = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
      }
    );

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(
        `Failed to fetch anonymous access token: ${authResponse.status} ${authResponse.statusText} - ${errorText}`
      );
    }

    const anonymousTokenData: AnonymousAccessToken = await authResponse.json();

    return anonymousTokenData;
  } catch (error) {
    throw new Error(
      `Couldnt get anonymous token data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
