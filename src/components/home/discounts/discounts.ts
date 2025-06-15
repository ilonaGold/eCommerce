import { getDiscounts } from "../../../services/API/promo/getDiscounts";
import { createElement } from "../../../utils/dom/createElement";
import { goToView } from "../../../routing/router";

import "./discounts.css";
import { getRandomColor } from "../../../utils/randomColor";

export const discounts = async (): Promise<HTMLElement> => {
  const discountSection = createElement("section", { class: "home-page__discounts-section" });
  const currentDiscounts = await getDiscounts();
  let noDiscounts = true;
  if (currentDiscounts.limit) {
    for (const result of currentDiscounts.results) {
      if (result.isActive) {
        noDiscounts = false;
        const banner = createElement("div", { class: "home-page__discount-banner" }, [
          createElement("p", { class: "home-page__discount-name" }, [`${result.name["en-US"]}`]),
          createElement("button", { class: "home-page__discount-button" }, ["Check it now"], {
            events: {
              click: () => goToView("products"),
            },
          }),
        ]);
        banner.style.background = getRandomColor();
        discountSection.append(banner);
      }
    }
  }
  if (noDiscounts) {
    const banner = createElement("div", { class: "home-page__discount-banner" }, [
      createElement("h3", { class: "home-page__discount-name" }, ["No available discounts"]),
    ]);
    discountSection.append(banner);
  }
  return discountSection;
};
