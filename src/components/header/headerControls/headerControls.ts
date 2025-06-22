import { Customer } from "../../../interfaces/dataInterfaces";
import { BasketItem } from "../../../interfaces/interfaces";
import { createElement } from "../../../utils/dom/createElement";
import { createUserActions } from "./userActions/userActions";
import { getState, subscribe } from "../../../state/state";
import basketIconImg from "../../../assets/images/basket.png";
import "./headerControls.css";

export const createHeaderControls = (
  isLoggedIn: boolean,
  customer: Customer | null
): HTMLElement => {
  // Create a reference to the count element to get its value later
  const basketCountElement = createElement("span", { class: "basket-count" }, [
    getBasketItemCount(),
  ]);
  // Subscribe to basket changes
  subscribe(["basket"], () => {
    // Update the count when basket changes
    basketCountElement.textContent = getBasketItemCount();
  });
  // Create basket icon with count element
  const basketLink = createElement("a", { href: "/my-basket", class: "basket-icon-link" }, [
    createElement("img", {
      src: basketIconImg,
      alt: "Shopping Basket",
      class: "basket-icon",
    }),
    basketCountElement,
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

// Function to get basket item count from state (synchronous for immediate UI updates)
function getBasketItemCount(): string {
  const basket = (getState("basket") as BasketItem[]) || [];
  const itemCount = Array.isArray(basket)
    ? basket.reduce((total: number, item: BasketItem) => total + (item.quantity || 1), 0)
    : 0;

  return itemCount > 0 ? itemCount.toString() : "0";
}
