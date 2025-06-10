import { getState, setProductsData } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import { catalogComponent } from "../../components/catalog/catalogComponent";

import { productProjectionSearch } from "../../services/API/products/productProjectionSearch";
import { loadingAnimation } from "../../components/loadingAnimation/loadingAnimation";

import { queryBuilder } from "../../components/catalog/searchPanel/helpers/queryBuilder";
import { readFiltersFromUrl } from "./helpers/readFiltersFromUrl";
import "./renderProducts.css";

export async function renderProducts(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const header = createHeader(isAuth, customer);
  const main = mainComponent(loadingAnimation());
  const footer = createFooter();

  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);

  parent.append(viewContainer);

  // Fetching & Appending
  let productsData;

  if (location.search) {
    productsData = await productProjectionSearch(queryBuilder(readFiltersFromUrl()));
  } else {
    productsData = await productProjectionSearch("facet=categories.id");
  }

  setProductsData(productsData);
  const productsCatalog = await catalogComponent(productsData);
  main.replaceChildren(productsCatalog);
}
