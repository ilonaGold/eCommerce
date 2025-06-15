import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";
import { getPromoCodes } from "../../../services/API/promo/getPromoCodes";

import "./promoCode.css";

export const promoCode = async (): Promise<HTMLElement> => {
  const promoCodes = await getPromoCodes();
  const container = createElement("section", { class: "home-page__promocode-section" }, [
    createElement("h2", { class: "home-page__header" }, ["Save with our promo codes today!"]),
  ]);
  const codes = createElement("div", { class: "home-page__code-content" });
  if (promoCodes.limit) {
    for (const item of promoCodes.results) {
      const code = createElement("div", { class: "home-page__promocode" }, [`${item.code}`]);
      codes.append(code);
    }
  }
  const shopNowButton = createElement("button", { class: "home-page__shop-button" }, ["Shop now"], {
    events: {
      click: () => goToView("products"),
    },
  });
  container.append(codes, shopNowButton);
  return container;
};
