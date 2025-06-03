import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";

import "./catalogComponent.css";

export const catalogComponent = (productsData: PagedSearchResponse): HTMLElement => {
  const products = productList(productsData.results);

  const catalog = createElement("section", { class: "center catalog-center" }, [products]);

  return catalog;
};
