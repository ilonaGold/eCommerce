import { createElement } from "../../utils/dom/createElement";
import { createInputGroup, createSectionTitle } from "./helpers/helpers";

export function createRegistrationForm(): HTMLFormElement {
  const form = createElement("form", { id: "registration-form" }, [
    createElement("div", { id: "userFields" }, [
      createSectionTitle("User Information"),
      createInputGroup("First Name", "text", "firsName", true),
      createInputGroup("Last Name", "text", "lastName", true),
      createInputGroup("Password", "password", "password", true),
      createInputGroup("RepeatPassword", "password", "repeatPassword", true),
    ]),

    createElement("div", { id: "addressFields" }, [
      createSectionTitle("Address Information"),
      createInputGroup("Street Address", "text", "address", true),
      createInputGroup("City", "text", "city", true),
      createInputGroup("Postal Code", "text", "postalCode", true),
      createInputGroup("Country", "text", "country", true),
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

    // Billing address fields
    createElement("div", { id: "billingFields", style: "display: none" }, [
      createSectionTitle("Billing Address"),
      createInputGroup("Billing Street", "text", "billingAddress"),
      createInputGroup("Billing City", "text", "billingCity"),
      createInputGroup("Billing Postal Code", "text", "billingPostalCode"),
      createInputGroup("Billing Country", "text", "billingCountry"),
    ]),

    // Submit Button
    createElement("button", { type: "submit" }, ["Register"]),
  ]);

  return form;
}
