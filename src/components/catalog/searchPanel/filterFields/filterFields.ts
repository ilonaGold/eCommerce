import { createElement } from "../../../../utils/dom/createElement";

import "./filterFields.css";

export const createFilterFields = (): HTMLDivElement => {
  const sortSelect = createElement("select", { class: "sort-select", name: "sort" }, [
    createElement("option", { value: "" }, ["Sort by"]),
    createElement("option", { value: "price-asc" }, ["Price: Low to High"]),
    createElement("option", { value: "price-desc" }, ["Price: High to Low"]),
    createElement("option", { value: "name-asc" }, ["Name: A-Z"]),
  ]);

  const categoriesSelect = createElement(
    "select",
    { class: "categories-select", name: "category" },
    [
      createElement("option", { value: "" }, ["All Categories"]),
      createElement("option", { value: "animal" }, ["Animal"]),
      createElement("option", { value: "brand" }, ["Brand"]),
      createElement("option", { value: "home" }, ["Home & Kitchen"]),
    ]
  );

  const priceMin = createElement("input", {
    type: "number",
    class: "price-input",
    name: "priceMin",
    placeholder: "Min Price",
    min: "0",
  });

  const priceMax = createElement("input", {
    type: "number",
    class: "price-input",
    name: "priceMax",
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
