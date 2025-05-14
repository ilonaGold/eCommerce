import { createRegistrationForm } from "../components/registration/registrationForm";
import { ensureRootElement } from "../utils/dom/ensureRootElement";

const root = ensureRootElement();

export const renderRegistration = (parent = root) => {
  const registerForm = createRegistrationForm();
  parent.append(registerForm);
};
