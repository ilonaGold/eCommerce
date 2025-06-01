import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";
import { productList } from "../../components/products/productList";
import { getProducts } from "../../services/API/products/getProducts";

import "./renderMain.css";
import { productProjectionSearch } from "../../services/API/products/productProjectionSearch";

export async function renderMain(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  // Fetch products
  const products = await getProducts();
  productProjectionSearch();

  console.log(products);

  const viewContainer = createElement("div", { class: "view-container" }, [
    createHeader(isAuth, customer),
    mainComponent(productList(products.results)),
    createFooter(),
  ]);

  parent.append(viewContainer);
}
