import { searchPanel } from "./searchPanel/searchPanel";
import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";

import { subscribe } from "../../state/state";

import { getCategories } from "../../services/API/products/getCategories";
import { categorySidebar } from "./categoryBar/categoryBar";

import "./catalogComponent.css";

export const catalogComponent = async (productsData: PagedSearchResponse): Promise<HTMLElement> => {
  const searchPanelComponent = searchPanel();
  let products = productList(productsData.results);

  const categories = await getCategories();

  const categoryBar = categorySidebar(productsData, categories);

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [
      searchPanelComponent,
      categoryBar,
      products,
    ]),
  ]);

  subscribe((state) => {
    const newProducts = productList(state.productsData.results);
    products.replaceWith(newProducts);
    products = newProducts;
    // Testing
    categoryBar.replaceWith(categorySidebar(productsData, categories));
    // Testing
  });

  return catalog;
};
