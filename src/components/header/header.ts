import { Customer } from "../../interfaces/dataInterfaces";
import { navigateTo } from "../../routing/router";
import { clearLoginData } from "../../services/localStorage/localStorage";
import { setState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";

import "./header.css";

export const headerComponent = (isLoggedIn: boolean, customer: Customer | null): HTMLElement => {
  const headingContainer = createElement("h2", { class: "heading-container" }, ["RedPandaSquad"], {
    events: {
      click: () => {
        navigateTo("/");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });
  const navBar = createElement("nav", { class: "navbar" }, [
    /*all links we'll need to put later */
  ]);

  const toLogin = createElement("a", {}, ["Log In"], {
    events: {
      click: (e) => {
        e.preventDefault();
        navigateTo("/login");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });
  const toRegister = createElement("a", {}, ["Register"], {
    events: {
      click: (e) => {
        e.preventDefault();
        navigateTo("/registration");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  const toLogout = createElement("a", {}, ["Log Out"], {
    events: {
      click: (e) => {
        e.preventDefault();
        setState("userAuth", false);
        setState("customer", null);
        clearLoginData();
        navigateTo("/");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  const userActionChildren = isLoggedIn
    ? [`Welcome, ${customer?.firstName}`, " / ", toLogout]
    : [toLogin, " / ", toRegister];

  const userActions = createElement("div", { class: "user-actions" }, userActionChildren, {
    styles: { fontSize: "1.2rem" },
  });

  const header = createElement("header", { class: "header" }, [
    createElement("div", {}, [headingContainer, navBar, userActions], {
      classes: ["center", "header-center"],
    }),
  ]);

  return header;
};
