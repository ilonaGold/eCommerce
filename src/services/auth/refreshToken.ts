import { getLoginInfo, storeLoginData } from "../localStorage/localStorage";

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const basicAuthString = btoa(
    `${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`
  );

  const refreshTokenResponse = await fetch(`${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuthString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const refreshedToken = await refreshTokenResponse.json();

  // handle updating localStorage for loginInfo
  console.log(refreshedToken);
  const currentLoginInfo = getLoginInfo();
  if (currentLoginInfo) {
    currentLoginInfo.accessToken = refreshedToken.access_token;
    currentLoginInfo.expiresAt = Date.now() + refreshedToken.expires_in * 1000;
    storeLoginData(currentLoginInfo);
  }
  // handle updating localStorage for loginInfo

  return refreshedToken.access_token;
};
