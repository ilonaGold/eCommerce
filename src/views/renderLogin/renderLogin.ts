import { createLoginForm } from "../../components/login/loginForm";
import { createElement } from "../../utils/dom/createElement";

import "./renderLogin.css";

export const renderLogin = (parent: HTMLElement): void => {
  const loginForm = createLoginForm();

  const toRegisterBtn = createElement(
    "button",
    { type: "button", class: "register-redirect-btn" },
    ["Don't have an account? Register"]
  );

  const loginContainer = createElement("div", { class: "login-container" }, [
    loginForm,
    toRegisterBtn,
  ]);

  parent.append(loginContainer);
};
