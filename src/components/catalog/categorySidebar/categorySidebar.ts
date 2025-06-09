import { CategoryPagedQueryResponse } from "../../../interfaces/products/categories/categories";
import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { categoryMapCreator } from "./helpers/categoryMapCreator";

export const categorySidebar = (
  productsData: PagedSearchResponse,
  categoriesData: CategoryPagedQueryResponse
): void => {
  const { categoryMap, rootCategories } = categoryMapCreator(productsData, categoriesData);
  console.log(categoryMap, rootCategories);
};
