import { CategoryWithChildren } from "../../../../interfaces/products/categories/categories";
import { getState } from "../../../../state/state";
import { createElement } from "../../../../utils/dom/createElement";
import { getBreadCrumbTrail } from "./helpers/getBreadCrumbTrail";
import { crumb, homeCrumb } from "./crumb/crumb";

export const breadCrumbs = (categoryMap: { [id: string]: CategoryWithChildren }): HTMLElement => {
  // Get categoryId from State or URL
  const statedCategory = getState("searchFormData").category;
  const categoryFromURL = new URLSearchParams(location.search).get("category");

  const choosenCategory = categoryFromURL || statedCategory || "";
  // Get categoryId from State or URL

  const breadCrumbTrail = getBreadCrumbTrail(categoryMap, choosenCategory);
  console.log(breadCrumbTrail);

  // HTML part

  const breadCrumbElements: (HTMLElement | string)[] = [];

  // ----------------------------------------------------------------------
  breadCrumbElements.push(homeCrumb());

  if (breadCrumbTrail.length > 0) {
    breadCrumbElements.push(" > ");
  }

  breadCrumbTrail.forEach((category, index) => {
    const isLast = index === breadCrumbTrail.length - 1;

    const crumbComponent = crumb(category);

    breadCrumbElements.push(crumbComponent);

    if (!isLast) breadCrumbElements.push(" > ");
  });
  // ----------------------------------------------------------------------

  return createElement("div", { class: "breadcrumbs" }, breadCrumbElements);
};
