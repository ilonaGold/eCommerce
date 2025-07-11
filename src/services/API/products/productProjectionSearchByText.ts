import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export const productProjectionSearchByText = async (slug: string): Promise<PagedSearchResponse> => {
  const searchUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?text.en-US=${slug}`;
  const accessToken = (await getAccessTokenData()).access_token;

  try {
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch search response: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: PagedSearchResponse = await response.json();

    return data;
    //
  } catch (error) {
    throw new Error(
      `Couldn't get access token data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
