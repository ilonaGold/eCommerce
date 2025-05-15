import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "./helpers/buildBlocks";
import { registrationFormInit } from "./helpers/registrationFormInit";

export function createRegistrationForm(): HTMLFormElement {
  const form = createElement("form", { id: "registration-form" }, [
    createElement("div", { id: "userFields" }, [
      createSectionTitle("User Information"),
      createInputGroup("First Name", "text", "firsName"),
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
      createInputGroup("Country", "text", "country"),
    ]),

    // Billing address fields
    createElement("div", { id: "billingFields", style: "display: none" }, [
      createSectionTitle("Billing Address"),
      createInputGroup("Billing Street", "text", "billingAddress"),
      createInputGroup("Billing City", "text", "billingCity"),
      createInputGroup("Billing Postal Code", "text", "billingPostalCode"),
      createInputGroup("Billing Country", "text", "billingCountry"),
    ]),

    // Default address checkbox
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
