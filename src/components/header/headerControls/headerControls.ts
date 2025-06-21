import { Customer } from "../../../interfaces/dataInterfaces";
import { createElement } from "../../../utils/dom/createElement";
import { createUserActions } from "./userActions/userActions";
import { getState } from "../../../state/state";
import basketIcon from "../../../assets/images/basket.png";

import "./headerControls.css";

export const createHeaderControls = (
  isLoggedIn: boolean,
  customer: Customer | null
): HTMLElement => {
  // Create basket icon
  // Better event listener placement
  const basketLink = createElement("a", { href: "/my-basket", class: "basket-icon-link" }, [
    createElement("img", {
      src: "../../../assets/images/basket.png",
      alt: "Shopping Basket",
      class: "basket-icon",
    }),
    createElement("span", { class: "basket-count" }, [getBasketItemCount()]),
  ]);

  // Add event listener to the link
  basketLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState({}, "", "/my-basket");
    window.dispatchEvent(new Event("popstate"));
  });

  const basketIcon = createElement("div", { class: "basket-icon-container" }, [basketLink]);

  const userActions = createUserActions(isLoggedIn, customer);
  const hamburger = createElement("div", { class: "hamburger-menu" }, [
    createElement("span", { class: "hamburger-icon" }),
  ]);

  const controls = createElement("div", { class: "header-controls" }, [
    basketIcon,
    userActions,
    hamburger,
  ]);

  return controls;
};

// Function to get basket item count from state
function getBasketItemCount(): string {
  const basket = (getState("basket") as unknown[]) || [];
  const itemCount = Array.isArray(basket) ? basket.length : 0;

  return itemCount > 0 ? itemCount.toString() : "0";
}
