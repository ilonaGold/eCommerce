import { createLoginForm } from "../../components/login/loginForm";
import { goToView } from "../../routing/router";
import { createElement } from "../../utils/dom/createElement";

import "./renderLogin.css";

export const renderLogin = (parent: HTMLElement): void => {
  const loginForm = createLoginForm();

  const toRegisterBtn = createElement(
    "button",
    { type: "button", class: "register-redirect-btn" },
    ["Don't have an account? Register"],
    { events: { click: () => goToView("registration") } }
  );

  const loginContainer = createElement("div", { class: "login-container" }, [
    loginForm,
    toRegisterBtn,
  ]);

  parent.append(loginContainer);
};
