import { footerComponent } from "../../components/footer/footer";
import { headerComponent } from "../../components/header/header";
import { createRegistrationForm } from "../../components/registration/registrationForm";
import { navigateTo } from "../../routing/router";
import { createElement } from "../../utils/dom/createElement";

import "./registration.css";

export const renderRegistration = (parent: HTMLElement): void => {
  const registerForm = createRegistrationForm();

  const toLoginBtn = createElement(
    "button",
    { type: "button", class: "login-redirect-btn" },
    ["Already have an account? Login"],
    { events: { click: () => navigateTo("login") } }
  );

  const registerFormContainer = createElement("div", { class: "register-container" }, [
    registerForm,
    toLoginBtn,
  ]);

  const viewContainer = createElement("div", { class: "view-container" }, [
    headerComponent(),
    registerFormContainer,
    footerComponent(),
  ]);

  parent.append(viewContainer);
};
