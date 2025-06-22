import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { getAccessTokenData } from "../../auth/getAccessTokenData";

export interface ProductSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string[];
  categoryId?: string;
  facet?: string[];
}

export const productProjectionSearch = async (
  params: ProductSearchParams = {}
): Promise<PagedSearchResponse> => {
  const {
    query = "",
    page = 1,
    limit = 12, // Better for responsive design (4x3 grid)
    filter = [],
    categoryId,
    facet = [],
  } = params;

  // Calculate offset based on page number
  const offset = (page - 1) * limit;

  // Build query parameters
  const queryParams = new URLSearchParams(query);

  // Add pagination parameters
  queryParams.append("limit", limit.toString());
  queryParams.append("offset", offset.toString());

  // Add category filter if provided
  if (categoryId) {
    queryParams.append("filter", `categories.id:"${categoryId}"`);
  }
  // Add additional filters
  filter.forEach((filterParam) => {
    queryParams.append("filter", filterParam);
  });

  // Add facets for categories and other aggregations
  facet.forEach((facetParam) => {
    queryParams.append("facet", facetParam);
  });

  const searchUrl = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?${queryParams.toString()}`;
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
    console.log(`Fetched ${data.count} products (page ${page}, total: ${data.total})`);

    return data;
  } catch (error) {
    throw new Error(
      `Couldn't get data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

// Legacy function for backward compatibility
export const productProjectionSearchLegacy = async (
  queryStr: string = ""
): Promise<PagedSearchResponse> => {
  return productProjectionSearch({ query: queryStr });
};
