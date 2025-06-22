import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";

import "./mainBanner.css";

export const mainBanner = (): HTMLElement => {
  const banner = createElement("section", { class: "home-page__main-banner-section" }, [
    createElement("h2", { class: "home-page__header" }, ["Accessories and food for your pets"]),
    createElement("button", { class: "home-page__shop-button" }, ["Shop now"], {
      events: {
        click: () => goToView("products"),
      },
    }),
  ]);
  return banner;
};
