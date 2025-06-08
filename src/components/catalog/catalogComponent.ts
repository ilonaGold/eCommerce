import { searchPanel } from "./searchPanel/searchPanel";
import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";

import "./catalogComponent.css";
import { subscribe } from "../../state/state";

export const catalogComponent = (productsData: PagedSearchResponse): HTMLElement => {
  const searchPanelComponent = searchPanel();
  let products = productList(productsData.results);

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [searchPanelComponent, products]),
  ]);

  subscribe((state) => {
    const newProducts = productList(state.products);
    products.replaceWith(newProducts);
    products = newProducts;
  });

  return catalog;
};
