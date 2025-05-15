import { createRegistrationForm } from "../components/registration/registrationForm";
import { createElement } from "../utils/dom/createElement";
import { ensureRootElement } from "../utils/dom/ensureRootElement";

import "./registration.css";

const root = ensureRootElement();

export const renderRegistration = (parent = root): void => {
  const registerForm = createRegistrationForm();

  const registerFormContainer = createElement("div", { class: "register-container" }, [
    registerForm,
  ]);

  parent.append(registerFormContainer);
};
