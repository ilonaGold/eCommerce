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
      createInputGroup("RepeatPassword", "password", "repeatPassword", true),
      createInputGroup("Date of Birth", "date", "dateOfBirth", true),
    ]),

    createElement("div", { id: "addressFields" }, [
      createSectionTitle("Address Information"),
      createInputGroup("Street Address", "text", "address", true),
      createInputGroup("City", "text", "city", true),
      createSelectGroup("Country", "country", countryCodes, true),
      createInputGroup("Postal Code", "text", "postalCode"),
      // default shipping address checkbox
      createElement("label", {}, [
        createElement("input", {
          type: "checkbox",
          name: "defaultShipping",
          id: "defaultShipping",
        }),
        " Use as default shipping address",
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
      createElement("label", {}, [
        createElement("input", {
          type: "checkbox",
          name: "defaultBilling",
          id: "defaultBilling",
        }),
        " Use as default billing address",
      ]),
    ]),

    // Separate billing address checkbox
    createElement("label", {}, [
      createElement("input", {
        type: "checkbox",
        name: "separateBilling",
        id: "separateBilling",
      }),
      " Use separate billing address",
    ]),

    // Submit Button
    createElement("button", { type: "submit" }, ["Register"]),
  ]);
  validateRegistrationForm(form);
  registrationFormInit(form);

  return form;
}
