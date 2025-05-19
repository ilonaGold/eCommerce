import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { togglePasswordVisibility } from "../../utils/dom/form/togglePasswordVisibility";
import { loginFormInit } from "./helpers/loginFormInit";
import { validateLoginForm } from "./helpers/loginFormValidation";

export function createLoginForm(): HTMLFormElement {
  const form = createElement("form", { id: "loginForm" }, [
    createSectionTitle("Sign In"),
    createInputGroup("Email", "email", "email", true),
    createInputGroup("Password", "password", "password", true),
    createInputGroup("Show password", "checkbox", "showPassword"),
    createElement("button", { type: "submit" }, ["Sign In"]),
  ]);

  togglePasswordVisibility(form);
  validateLoginForm(form);
  loginFormInit(form);

  return form;
}
