import { searchPanel } from "./searchPanel/searchPanel";
import { PagedSearchResponse } from "../../interfaces/products/ProductProjection";
import { createElement } from "../../utils/dom/createElement";
import { productList } from "./productsList/productList";

import { subscribe } from "../../state/state";

import { getCategories } from "../../services/API/products/getCategories";
import { categorySidebar } from "./categorySidebar/categorySidebar";

import "./catalogComponent.css";

export const catalogComponent = async (productsData: PagedSearchResponse): Promise<HTMLElement> => {
  const searchPanelComponent = searchPanel();
  let products = productList(productsData.results);

  const categories = await getCategories();

  const catalog = createElement("section", { class: "catalog-section" }, [
    createElement("div", { class: "center catalog-center" }, [searchPanelComponent, products]),
  ]);

  subscribe((state) => {
    const newProducts = productList(state.productsData.results);
    products.replaceWith(newProducts);
    products = newProducts;
    // Testing
    categorySidebar(productsData, categories);
    // Testing
  });

  return catalog;
};
