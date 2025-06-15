import { DiscountCodePagedQueryResponse } from "../../../interfaces/promo/promoInterfaces";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const getPromoCodes = async (): Promise<DiscountCodePagedQueryResponse> => {
  const promoCodeUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/discount-codes`;
  const accessToken = (await getAccessTokenData()).access_token;
  try {
    const response = await fetch(promoCodeUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch promo codes response: ${response.status} ${response.statusText} - ${errorText}`
      );
    }
    const promoCodesData: DiscountCodePagedQueryResponse = await response.json();
    return promoCodesData;
  } catch (error) {
    throw new Error(
      `Couldn't get promo codes data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
