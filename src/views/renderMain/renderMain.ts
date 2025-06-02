import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import { productList } from "../../components/products/productList";

import "./renderMain.css";
import { productProjectionSearch } from "../../services/API/products/productProjectionSearch";
import { dummyLoading } from "../../components/dummyLoading/dummyLoading";

export async function renderMain(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const header = createHeader(isAuth, customer);
  const main = mainComponent(dummyLoading());
  const footer = createFooter();

  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);

  parent.append(viewContainer);

  const products = await productProjectionSearch();
  const productsCatalog = productList(products.results);
  main.replaceChildren(productsCatalog);
}
