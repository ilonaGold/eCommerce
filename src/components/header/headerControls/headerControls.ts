import { Customer } from "../../../interfaces/dataInterfaces";
import { createElement } from "../../../utils/dom/createElement";
import { createUserActions } from "./userActions/userActions";

import "./headerControls.css";

export const createHeaderControls = (
  isLoggedIn: boolean,
  customer: Customer | null
): HTMLElement => {
  const userActions = createUserActions(isLoggedIn, customer);
  const hamburger = createElement("div", { class: "hamburger-menu" }, [
    createElement("span", { class: "hamburger-icon" }),
  ]);

  const controls = createElement("div", { class: "header-controls" }, [userActions, hamburger]);

  return controls;
};
