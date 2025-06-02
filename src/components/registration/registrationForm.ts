import { createElement } from "../../utils/dom/createElement";
import { registrationFormInit } from "./helpers/registrationFormInit";
import countryCodes from "../../assets/data/countryCodes.json";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { createSelectGroup } from "../../utils/dom/form/createSelectGroup";
import { validateRegistrationForm } from "./helpers/registerFormValidation";

export function createRegistrationForm(): HTMLFormElement {
  const form = createElement("form", { id: "registrationForm" }, [
    createElement("div", { id: "userFields" }, [
      createSectionTitle("User Information"),
      createInputGroup("Email", "email", "email", true),
      createInputGroup("First Name", "text", "firstName", true),
      createInputGroup("Last Name", "text", "lastName", true),
      createInputGroup("Password", "password", "password", true),
      createInputGroup("Repeat Password", "password", "repeatPassword", true),
      createInputGroup("Date of Birth", "date", "dateOfBirth", true),
    ]),

    createElement("div", { id: "addressFields" }, [
      createSectionTitle("Address Information"),
      createInputGroup("Street", "text", "address", true),
      createInputGroup("City", "text", "city", true),
      createSelectGroup("Country", "country", countryCodes, true),
      createInputGroup("Postal Code", "text", "postalCode"),
      // default shipping address checkbox
      createElement("label", { class: "custom-checkbox" }, [
        "Use as default shipping address",
        createElement("input", {
          type: "checkbox",
          name: "defaultShipping",
          id: "defaultShipping",
        }),
        createElement("span", { class: "checkmark" }, []),
      ]),
    ]),

    // Billing address fields
    createElement("div", { id: "billingFields", style: "display: none" }, [
      createSectionTitle("Billing Address"),
      createInputGroup("Billing Street", "text", "billingAddress", true),
      createInputGroup("Billing City", "text", "billingCity", true),
      createSelectGroup("Country", "billingCountry", countryCodes, true),
      createInputGroup("Billing Postal Code", "text", "billingPostalCode"),
      // default billing address checkbox
      createElement("label", { class: "custom-checkbox" }, [
        "Use as default billing address",
        createElement("input", {
          type: "checkbox",
          name: "defaultBilling",
          id: "defaultBilling",
        }),
        createElement("span", { class: "checkmark" }, []),
      ]),
    ]),

    // Separate billing address checkbox
    createElement("label", { class: "custom-checkbox" }, [
      "Use separate billing address",
      createElement("input", {
        type: "checkbox",
        name: "separateBilling",
        id: "separateBilling",
      }),
      createElement("span", { class: "checkmark" }, []),
    ]),

    // Submit Button
    createElement("button", { type: "submit", class: "submit-btn" }, ["Register"]),
  ]);
  validateRegistrationForm(form);
  registrationFormInit(form);

  return form;
}
