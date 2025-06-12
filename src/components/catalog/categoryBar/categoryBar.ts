import { CategoryPagedQueryResponse } from "../../../interfaces/products/categories/categories";
import { PagedSearchResponse } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { categoryMapCreator } from "./helpers/categoryMapCreator";

import { breadCrumbs } from "./breadCrumbs/breadCrumbs";
import "./categoryBar.css";

export const categorySidebar = (
  productsData: PagedSearchResponse,
  categoriesData: CategoryPagedQueryResponse
): HTMLElement => {
  const { categoryMap, rootCategories } = categoryMapCreator(productsData, categoriesData);
  console.log(categoryMap, rootCategories);

  const breadCrumbsComponent = breadCrumbs();

  const listingQuantity = createElement("div", {}, [`Listings: ${productsData.total}`], {
    styles: {
      border: "1px solid #990000",
      borderRadius: "0.3rem",
      padding: "0.3rem 0.5rem",
    },
  });

  const categoryNavbar = createElement("div", {}, [breadCrumbsComponent, listingQuantity], {
    classes: ["category-navbar"],
  });

  return categoryNavbar;
};
