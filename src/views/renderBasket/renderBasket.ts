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

  // Empty basket message with heading and button
  const section = createElement("div", { class: "basket-page__section" }, [
    createElement("div", { class: "basket-page__placeholder" }, [
      createElement("h2", { class: "basket-page__title" }, ["Your Basket is Empty"]),
      createElement("p", {}, [
        "No treats in your basket yet! Start shopping and fill your basket!",
      ]),
      createElement("button", { class: "continue-shopping-btn" }, ["Continue Shopping"], {
        events: {
          click: (e: Event) => {
            e.preventDefault();
            window.history.pushState({}, "", "/products");
            window.dispatchEvent(new Event("popstate"));
          },
        },
      }),
    ]),
  ]);

  const main = mainComponent(section);
  const footer = createFooter();
  const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);
  parent.append(viewContainer);
}
