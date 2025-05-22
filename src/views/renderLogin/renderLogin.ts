import { footerComponent } from "../../components/footer/footer";
import { headerComponent } from "../../components/header/header";
import { createLoginForm } from "../../components/login/loginForm";
import { navigateTo } from "../../routing/router";
import { createElement } from "../../utils/dom/createElement";

import "./renderLogin.css";

export const renderLogin = (parent: HTMLElement): void => {
  const loginForm = createLoginForm();

  const toRegisterBtn = createElement(
    "button",
    { type: "button", class: "register-redirect-btn" },
    ["Don't have an account? Register"],
    { events: { click: () => navigateTo("registration") } }
  );

  const loginContainer = createElement("div", { class: "login-container" }, [
    loginForm,
    toRegisterBtn,
  ]);

  const viewContainer = createElement("div", { class: "view-container" }, [
    headerComponent(),
    loginContainer,
    footerComponent(),
  ]);

  parent.append(viewContainer);
};
