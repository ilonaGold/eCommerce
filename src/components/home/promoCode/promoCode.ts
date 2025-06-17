import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";
import { getPromoCodes } from "../../../services/API/promo/getPromoCodes";

import "./promoCode.css";

export const promoCode = async (): Promise<HTMLElement> => {
  const promoCodes = await getPromoCodes();
  const container = createElement("section", { class: "home-page__promocode-section" }, [
    createElement("h2", { class: "home-page__header" }, ["Save with our promo codes TODAY!"]),
  ]);

  // Create panda image container
  const pandaPromoContainer = createElement("div", { class: "home-page__panda-promo" });
  const pandaImage = createElement("img", {
    src: "../../../assets/images/panda-promo10.png",
    alt: "Red panda holding bamboo",
    class: "home-page__panda-image",
  });

  const codes = createElement("div");
  if (promoCodes.limit) {
    for (const item of promoCodes.results) {
      const code = createElement("div", {}, [`${item.code}`]);
      codes.append(code);
    }
  }

  // Add SUMMER10 overlay on the image
  const promoCodeElement = createElement("div", { class: "home-page__promo-overlay" }, [codes]);

  // Create shop now button
  const shopNowButton = createElement("button", { class: "home-page__shop-button" }, ["Shop now"], {
    events: {
      click: () => goToView("products"),
    },
  });

  // Add all elements to the container
  pandaPromoContainer.append(pandaImage, promoCodeElement, shopNowButton);

  // We won't add additional promo codes to avoid duplication

  container.append(pandaPromoContainer);
  return container;
};
