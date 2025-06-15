import { Customer } from "../../../../interfaces/dataInterfaces";
import { goToView } from "../../../../routing/router";
import { clearLoginData } from "../../../../services/localStorage/localStorage";
import { setAuth, setCustomer } from "../../../../state/state";
import { createElement } from "../../../../utils/dom/createElement";

import "./userActions.css";

export const createUserActions = (isLoggedIn: boolean, customer: Customer | null): HTMLElement => {
  // logout button
  const logOutBtn = createElement("a", { class: "logout-btn" }, ["Log Out"], {
    events: {
      click: (e) => {
        e.preventDefault();
        setAuth(false);
        setCustomer(null);
        clearLoginData();
        goToView("");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  // User profile button
  const userProfileBtn = createElement("a", { class: "user-profile-link" }, ["User Profile"], {
    events: {
      click: (e) => {
        e.preventDefault();
        goToView("user-profile");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  const headerButtonChildren = isLoggedIn
    ? [
        // user specific
        createElement("div", { class: "user-account" }, [
          createElement("div", { class: "welcome-message" }, [
            `Welcome, `,
            createElement("span", { class: "user-name" }, [customer?.firstName || "User"]),
          ]),
          createElement("div", { class: "user-controls" }, [userProfileBtn, logOutBtn]),
        ]),
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
