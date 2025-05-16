import { createRegistrationForm } from "../components/registration/registrationForm";
import { createElement } from "../utils/dom/createElement";

import "./registration.css";

export const renderRegistration = (parent: HTMLElement): void => {
  const registerForm = createRegistrationForm();

  const registerFormContainer = createElement("div", { class: "register-container" }, [
    registerForm,
  ]);

  parent.append(registerFormContainer);
};
