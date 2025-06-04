import { searchPanel } from "./searchPanel/searchPanel";
import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";

import "./catalogComponent.css";

export const catalogComponent = (productsData: PagedSearchResponse): HTMLElement => {
  const products = productList(productsData.results);
  const searchPanelComponent = searchPanel();

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [searchPanelComponent, products]),
  ]);

  return catalog;
};
