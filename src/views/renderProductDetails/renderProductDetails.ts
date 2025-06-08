import { description } from "../../components/productDetails/description/description";
import { ProductDetailsProps } from "../../interfaces/interfaces";
import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { mainComponent } from "../../components/main/main";

import "./renderProductDetails.css";

export function renderProductDetails({ parent, product }: ProductDetailsProps): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const descField = product ? description(product) : createElement("div");
  const detailsContainer = createElement("div", { class: "product-details_container" }, [
    descField,
  ]);
  const header = createHeader(isAuth, customer);
  const main = mainComponent(detailsContainer);
  const footer = createFooter();
  const viewContainer = createElement("div", { class: "product-details-page view-container" }, [
    header,
    main,
    footer,
  ]);
  parent.append(viewContainer);
}
