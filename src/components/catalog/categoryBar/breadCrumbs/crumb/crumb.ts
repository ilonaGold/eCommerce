import { CategoryWithChildren } from "./../../../../../interfaces/products/categories/categories";
import { createElement } from "../../../../../utils/dom/createElement";
import { setSearchFormData } from "../../../../../state/state";

import "./crumb.css";
import { crumbSearchHandler } from "./helpers/crumbSearchHandler";

export const crumb = (categoryWithChildren: CategoryWithChildren): HTMLElement => {
  return createElement("a", { href: "" }, [categoryWithChildren.name["en-US"]], {
    classes: ["breadcrumb-link"],
    events: {
      click: async (e) => {
        e.preventDefault();
        setSearchFormData({
          keyword: "",
          sort: "",
          category: categoryWithChildren.id || "",
          minPrice: "",
          maxPrice: "",
        });
        await crumbSearchHandler();
      },
    },
  });
};

export const homeCrumb = (): HTMLElement => {
  return createElement("a", { href: "" }, ["Home"], {
    classes: ["breadcrumb-link", "breadcrumb-home"],
    events: {
      click: (e) => {
        e.preventDefault();
        alert("Redirect to home");
      },
    },
  });
};
