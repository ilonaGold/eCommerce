import { Customer } from "../../../../../interfaces/dataInterfaces";
import { goToView } from "../../../../../routing/router";
import { clearLoginData } from "../../../../../services/localStorage/localStorage";
import { setAuth, setCustomer } from "../../../../../state/state";
import { createElement } from "../../../../../utils/dom/createElement";
import { initiateDropDown } from "./helpers/initiateDropDown";

import "./userAccount.css";

export const createUserAccountComponent = (customer: Customer | null): HTMLElement => {
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

  const userAccountComponent = createElement("div", { class: "user-account" }, [
    createElement("div", { class: "welcome-message dropdown-trigger" }, [
      createElement("span", {}, [`Welcome,`]),
      createElement("span", { class: "user-name" }, [customer?.firstName || "User"]),
      createElement("i", { class: "dropdown-icon" }, ["▼"]),
    ]),
    createElement("div", { class: "user-controls dropdown-menu" }, [userProfileBtn, logOutBtn]),
  ]);

  initiateDropDown(userAccountComponent);

  return userAccountComponent;
};
