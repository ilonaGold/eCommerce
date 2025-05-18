import { createElement } from "../../utils/dom/createElement";
import { registrationFormInit } from "./helpers/registrationFormInit";
import countryCodes from "../../assets/data/countryCodes.json";
import { createInputGroup, createSectionTitle } from "../../utils/dom/form/createInputGroup";
import { createSelectGroup } from "../../utils/dom/form/createSelectGroup";

export function createRegistrationForm(): HTMLFormElement {
  const form = createElement("form", { id: "registrationForm" }, [
    createElement("div", { id: "userFields" }, [
      createSectionTitle("User Information"),
      createInputGroup("Email", "email", "email"),
      createInputGroup("First Name", "text", "firstName"),
      createInputGroup("Last Name", "text", "lastName"),
      createInputGroup("Password", "password", "password"),
      createInputGroup("RepeatPassword", "password", "repeatPassword"),
      createInputGroup("Date of Birth", "date", "dateOfBirth"),
    ]),

    createElement("div", { id: "addressFields" }, [
      createSectionTitle("Address Information"),
      createInputGroup("Street Address", "text", "address"),
      createInputGroup("City", "text", "city"),
      createInputGroup("Postal Code", "text", "postalCode"),
      createSelectGroup("Country", "country", countryCodes),
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
      createInputGroup("Billing Street", "text", "billingAddress"),
      createInputGroup("Billing City", "text", "billingCity"),
      createInputGroup("Billing Postal Code", "text", "billingPostalCode"),
      createSelectGroup("Country", "billingCountry", countryCodes),
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
  registrationFormInit(form);

  return form;
}
