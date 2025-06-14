import {
  SearchFormData,
  SearchFormFieldKey,
} from "../../../../interfaces/products/search/searchQuery";

export const createSearchFormData = (search: string): SearchFormData => {
  const params = new URLSearchParams(search);
  const keys: SearchFormFieldKey[] = ["keyword", "sort", "category", "minPrice", "maxPrice"];

  const result: Partial<SearchFormData> = {};

  for (const key of keys) {
    result[key] = params.get(key) ?? "";
  }

  return result as SearchFormData;
};
