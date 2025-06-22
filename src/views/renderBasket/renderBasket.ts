import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import { mainComponent } from "../../components/main/main";
import { loadCartFromAPI } from "../../utils/dom/basket/basketOperations";
import { createBasketContent } from "../../components/basket/basketContent/basketContent";

import "./renderBasket.css";
import "../../components/basket/basketContent/basketContent.css";

export async function renderBasket(parent: HTMLElement): Promise<void> {
  try {
    // Load cart data from API first
    await loadCartFromAPI();

    const isAuth = getState("userAuth");
    const customer = getState("customer");
    const header = createHeader(isAuth, customer);

    // Create basket content with loading state
    const loadingContent = createElement("div", { class: "basket-page__section" }, [
      createElement("div", { class: "basket-page__placeholder" }, [
        createElement("h2", { class: "basket-page__title" }, ["Loading Cart..."]),
        createElement("p", {}, ["Please wait while we load your cart."]),
      ]),
    ]);

    const main = mainComponent(loadingContent);
    const footer = createFooter();
    const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);

    parent.append(viewContainer);

    // Load the actual cart content
    const basketContent = await createBasketContent();

    // Replace loading content with actual content
    main.replaceChildren(basketContent);
  } catch (error) {
    console.error("Error rendering basket:", error);

    // Show error state
    const isAuth = getState("userAuth");
    const customer = getState("customer");
    const header = createHeader(isAuth, customer);

    const errorContent = createElement("div", { class: "basket-page__section" }, [
      createElement("div", { class: "basket-page__placeholder" }, [
        createElement("h2", { class: "basket-page__title" }, ["Error Loading Cart"]),
        createElement("p", {}, ["We couldn't load your cart. Please try refreshing the page."]),
        createElement("button", { class: "continue-shopping-btn" }, ["Try Again"], {
          events: {
            click: (e: Event) => {
              e.preventDefault();
              window.location.reload();
            },
          },
        }),
      ]),
    ]);

    const main = mainComponent(errorContent);
    const footer = createFooter();
    const viewContainer = createElement("div", { class: "view-container" }, [header, main, footer]);

    parent.append(viewContainer);
  }
}
