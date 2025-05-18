import { createRegistrationForm } from "../../components/registration/registrationForm";
import { createElement } from "../../utils/dom/createElement";

import "./registration.css";

export const renderRegistration = (parent: HTMLElement): void => {
  const registerForm = createRegistrationForm();

  const toLoginBtn = createElement("button", { type: "button", class: "login-redirect-btn" }, [
    "Already have an account? Login",
  ]);

  const registerFormContainer = createElement("div", { class: "register-container" }, [
    registerForm,
    toLoginBtn,
  ]);

  parent.append(registerFormContainer);
};
