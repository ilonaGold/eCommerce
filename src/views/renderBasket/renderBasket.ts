import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { mainComponent } from "../../components/main/main";

import "./renderBasket.css";

export async function renderBasket(parent: HTMLElement): Promise<void> {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const header = createHeader(isAuth, customer);
  const section = createElement("div", { class: "basket-page__section" }, [
    createElement("div", { class: "basket-page-placeholder" }, [
      "No treats in your basket yet! Start shopping and fill your basket!",
    ]),
  ]);

  const main = mainComponent(section);
  const footer = createFooter();
  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);
  parent.append(viewContainer);
}
