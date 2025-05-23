import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { loginFormInit } from "./helpers/loginFormInit";
import { setView } from "../../state/state";
import { createHeader } from "../header/header";
import { createFooter } from "../footer/footer";
import "./loginForm.css";

// Login page component

export function createLoginPage(): HTMLElement {
  const container = createElement("div", { class: "login-container" }, [
    // Header
    createHeader(),
    // Main content
    createElement("main", { class: "main-content" }, [
      createElement("h2", { class: "welcome-text" }, ["Welcome to Red Panda Squad Shop"]),
      createElement("div", { class: "login-content" }, [
        createElement("div", { class: "form-container" }, [createLoginForm()]),
        createElement("div", { class: "image-container" }, [
          createElement("img", {
            src: "../../assets/images/panda-ninja.png",
            alt: "Panda Ninja",
            class: "panda-image",
          }),
        ]),
      ]),
    ]),

    // Footer
    createFooter(),
  ]);

  return container;
}

// Login form component

export function createLoginForm(): HTMLElement {
  const form = createElement("form", { id: "loginForm", class: "login-form" }, [
    createSectionTitle("Sign In"),
    createInputGroup("Email", "email", "email", true),
    createInputGroup("Password", "password", "password", true),
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
    setView("registration");
  });

  // Add registration invite inside form container
  const registrationInvite = createElement("div", { class: "registration-invite" }, [
    createElement("p", { class: "invite-text" }, ["Don't have an account?"]),
    registerLink,
  ]);

  // Create form wrapper to include both form and registration invite
  const formWrapper = createElement("div", { class: "form-wrapper" }, [form, registrationInvite]);

  const submitLink = form.querySelector(".submit-link");
  submitLink?.addEventListener("click", (e) => {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  });

  loginFormInit(form);
  return formWrapper;
}
