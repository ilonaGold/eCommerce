import { productProjectionSearchLegacy } from "../../../../services/API/products/productProjectionSearch";
import { setProductsData, setSearchFormData } from "../../../../state/state";
import { queryBuilder } from "./queryBuilder";

export const searchHandler = async (e: Event): Promise<void> => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) throw new Error("Form element doesnt exist");
  const formData = new FormData(form);
  const fields = Object.fromEntries(formData.entries().filter(([, value]) => Boolean(value))) as {
    [key: string]: string;
  };

  setSearchFormData({
    keyword: fields.keyword ?? "",
    sort: fields.sort ?? "",
    category: fields.category ?? "",
    minPrice: fields.minPrice ?? "",
    maxPrice: fields.maxPrice ?? "",
  });

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
