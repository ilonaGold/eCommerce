import { ProductDiscountPagedQueryResponse } from "../../../interfaces/promo/promoInterfaces";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const getDiscounts = async (): Promise<ProductDiscountPagedQueryResponse> => {
  const discountUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-discounts`;
  const accessToken = (await getAccessTokenData()).access_token;
  try {
    const response = await fetch(discountUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch discount response: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const discountsData: ProductDiscountPagedQueryResponse = await response.json();
    return discountsData;
  } catch (error) {
    throw new Error(
      `Couldn't get discounts data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
