import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { loginFormInit } from "./helpers/loginFormInit";
import { validateLoginForm } from "./helpers/loginFormValidation";

export function createLoginForm(): HTMLFormElement {
  const form = createElement("form", { id: "loginForm" }, [
    createSectionTitle("Sign In"),
    createInputGroup("Email", "email", "email", true),
    createInputGroup("Password", "password", "password", true),
    createElement("button", { type: "submit" }, ["Sign In"]),
  ]);

  validateLoginForm(form);
  loginFormInit(form);

  return form;
}
