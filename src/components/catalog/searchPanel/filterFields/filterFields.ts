import { getCategories } from "../../../../services/API/products/getCategories";
import { createElement } from "../../../../utils/dom/createElement";

import "./filterFields.css";

export const createFilterFields = (): HTMLDivElement => {
  const sortSelect = createElement("select", { class: "sort-select", name: "sort" }, [
    createElement("option", { value: "" }, ["Sort by"]),
    createElement("option", { value: "newest" }, ["Newest"]),
    createElement("option", { value: "priceAsc" }, ["Price: Low to High"]),
    createElement("option", { value: "priceDesc" }, ["Price: High to Low"]),
    createElement("option", { value: "nameAsc" }, ["Name: A-Z"]),
    createElement("option", { value: "nameDesc" }, ["Name: Z-A"]),
  ]);

  const categoriesSelect = createElement(
    "select",
    { class: "categories-select", name: "category" },
    [createElement("option", { value: "" }, ["All Categories"])]
  );

  // populate categories element with options
  getCategories().then((categoriesPagedResponse) => {
    const categories = categoriesPagedResponse.results;
    const options = categories.map((category) => {
      return createElement("option", { value: `${category.id}` }, [`${category.name["en-US"]}`]);
    });
    categoriesSelect.append(...options);
  });

  const priceMin = createElement("input", {
    type: "number",
    class: "price-input",
    name: "minPrice",
    placeholder: "Min Price",
    min: "0",
  });

  const priceMax = createElement("input", {
    type: "number",
    class: "price-input",
    name: "maxPrice",
    placeholder: "Max Price",
    min: "0",
  });

  const priceContainer = createElement("div", { class: "price-range-container" }, [
    priceMin,
    priceMax,
  ]);

  const filterFields = createElement(
    "div",
    {
      class: "filter-fields",
    },
    [sortSelect, categoriesSelect, priceContainer]
  );

  return filterFields;
};
