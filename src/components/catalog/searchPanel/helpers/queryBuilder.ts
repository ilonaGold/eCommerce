type SortKey = "priceAsc" | "priceDesc" | "newest" | "nameAsc" | "nameDesc";

export const queryBuilder = (formData: { [key: string]: string }): string => {
  if (Object.keys(formData).length === 0) {
    return "";
  }
  console.log(formData);

  const params = new URLSearchParams();

  if (formData.keyword) {
    params.append("text.en-US", formData.keyword);
  }

  if (formData.minPrice || formData.maxPrice) {
    const min = formData.minPrice ? Math.floor(Number(formData.minPrice) * 100) : 0;
    const max = formData.maxPrice ? Math.floor(Number(formData.maxPrice) * 100) : "*";
    params.append("filter", `variants.price.centAmount:range (${min} to ${max})`);
  }

  if (formData.category) {
    params.append("filter.query", `categories.id:subtree("${formData.category}")`);
  }

  const sortMap: Record<SortKey, string> = {
    nameAsc: "name.en-US asc",
    nameDesc: "name.en-US desc",
    priceAsc: "price asc",
    priceDesc: "price desc",
    newest: "createdAt desc",
  };
  if (formData.sort && (Object.keys(sortMap) as SortKey[]).includes(formData.sort as SortKey)) {
    params.append("sort", sortMap[formData.sort as SortKey]);
  }

  // hard-coded
  params.append("fuzzy", "true");
  params.append("priceCurrency", "EUR");
  params.append("priceCountry", "EU");

  console.log(params.toString());

  return params.toString();
};
