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
  const { categoryMap } = categoryMapCreator(productsData, categoriesData);
  const breadCrumbsComponent = breadCrumbs(categoryMap);

  const categoryNavbar = createElement("div", {}, [breadCrumbsComponent], {
    classes: ["category-navbar"],
  });

  return categoryNavbar;
};
