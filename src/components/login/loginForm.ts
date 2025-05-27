import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { togglePasswordVisibility } from "../../utils/dom/form/togglePasswordVisibility";
import { loginFormInit } from "./helpers/loginFormInit";
import { goToView } from "../../routing/router";
import { validateLoginForm } from "./helpers/loginFormValidation";

import "./loginForm.css";

export function createLoginForm(): HTMLElement {
  const form = createElement("form", { id: "loginForm", class: "login-form" }, [
    createSectionTitle("Sign In"),
    createInputGroup("Email", "email", "email", true),
    createInputGroup("Password", "password", "password", true),
    //createInputGroup("Show password", "checkbox", "showPassword"),
    createElement("div", { class: "toggle-password" }, [
      createElement("span", {}, ["Show password"]),
      createElement("input", { type: "checkbox", name: "showPassword", id: "showPassword" }),
    ]),
    createElement(
      "button",
      {
        type: "submit",
        class: "submit-btn",
      },
      ["Sign In"]
    ),
  ]);

  // Create a button for registration
  const registerLink = createElement(
    "a",
    {
      type: "#",
      class: "register-link",
    },
    ["Register"]
  );

  // Add click event listener to the link
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    goToView("registration");
  });

  // Add registration invite inside form container
  const registrationInvite = createElement("div", { class: "registration-invite" }, [
    createElement("p", { class: "invite-text" }, ["Don't have an account?"]),
    registerLink,
  ]);

  togglePasswordVisibility(form);
  validateLoginForm(form);
  loginFormInit(form);

  // Create form wrapper to include both form and registration invite
  const formWrapper = createElement("div", { class: "form-wrapper" }, [form, registrationInvite]);

  const submitLink = form.querySelector(".submit-link");
  submitLink?.addEventListener("click", (e) => {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  });

  return formWrapper;
}
