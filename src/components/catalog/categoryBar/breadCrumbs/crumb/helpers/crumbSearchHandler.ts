import { productProjectionSearchLegacy } from "../../../../../../services/API/products/productProjectionSearch";
import { getState, setProductsData } from "../../../../../../state/state";
import { queryBuilder } from "../../../../searchPanel/helpers/queryBuilder";

export const crumbSearchHandler = async (): Promise<void> => {
  const formData = getState("searchFormData");

  const fields = Object.fromEntries(
    Object.entries(formData).filter(([, value]) => Boolean(value))
  ) as {
    [key: string]: string;
  };

  // decorative query
  const params = new URLSearchParams();
  if (fields.keyword) params.set("keyword", fields.keyword);
  if (fields.minPrice) params.set("minPrice", fields.minPrice);
  if (fields.maxPrice) params.set("maxPrice", fields.maxPrice);
  if (fields.category) params.set("category", fields.category);
  if (fields.sort) params.set("sort", fields.sort);

  const qs = params.toString();
  const newUrl = `${location.pathname}${qs ? "?" + qs : ""}`;
  history.pushState({}, "", newUrl);
  // real query
  const query = queryBuilder(fields);

  const products = await productProjectionSearchLegacy(query);
  setProductsData(products);
};
