import { Customer } from "../../../../interfaces/dataInterfaces";
import { goToView } from "../../../../routing/router";
import { createElement } from "../../../../utils/dom/createElement";
import { createUserAccountComponent } from "./userAccount/userAccount";

import "./userActions.css";

export const createUserActions = (isLoggedIn: boolean, customer: Customer | null): HTMLElement => {
  const userAccount = createUserAccountComponent(customer);

  const headerButtonChildren = isLoggedIn
    ? [
        // user specific
        userAccount,
      ]
    : [
        // login/register
        createElement("button", { class: "header-btn login-btn", type: "button" }, ["Sign In"], {
          events: { click: () => goToView("login") },
        }),
        createElement(
          "button",
          {
            class: "header-btn register-btn",
            type: "button",
          },
          ["Register"],
          { events: { click: () => goToView("registration") } }
        ),
      ];

  const userActions = createElement("div", { class: "user-actions" }, headerButtonChildren);
  return userActions;
};
