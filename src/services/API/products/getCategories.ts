import { getAccessTokenData } from "../../auth/getAccessTokenData";
import { CategoryPagedQueryResponse } from "./../../../interfaces/products/categories/categories";
export const getCategories = async (): Promise<CategoryPagedQueryResponse> => {
  const categoryUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/categories`;
  const accessToken = (await getAccessTokenData()).access_token;
  try {
    const response = await fetch(categoryUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch category response: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const categoryData: CategoryPagedQueryResponse = await response.json();

    return categoryData;
  } catch (error) {
    throw new Error(
      `Couldn't get categories data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
