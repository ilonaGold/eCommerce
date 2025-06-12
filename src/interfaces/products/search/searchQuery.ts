export type SearchFormFieldKey = "keyword" | "sort" | "category" | "minPrice" | "maxPrice";

export type SearchFormData = {
  [key in SearchFormFieldKey]: string;
};
