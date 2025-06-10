import { CategoryPagedQueryResponse } from "../../../interfaces/products/categories/categories";
import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { categoryMapCreator } from "./helpers/categoryMapCreator";

import "./categoryBar.css";

export const categorySidebar = (
  productsData: PagedSearchResponse,
  categoriesData: CategoryPagedQueryResponse
): HTMLElement => {
  const { categoryMap, rootCategories } = categoryMapCreator(productsData, categoriesData);
  console.log(categoryMap, rootCategories);

  // const breadCrumbs = createElement("div", {}, ["Home > Products"]);

  // const listingGuantity = createElement("div", {}, ["Listings: 2300"]);

  const categoryNavbar = createElement(
    "div",
    {},
    [
      /*breadCrumbs, listingGuantity*/
    ],
    {
      classes: ["category-navbar"],
    }
  );

  return categoryNavbar;
};
