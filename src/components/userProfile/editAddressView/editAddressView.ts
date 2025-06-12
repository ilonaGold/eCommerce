import { createElement } from "../../../utils/dom/createElement";
import { getState } from "../../../state/state";
import { updateAddress } from "../../../services/addressService/addressService";
import countryCodes from "../../../assets/data/countryCodes.json";
import "./editAddressView.css";
import "../../../styles/styles.css"; // For custom checkboxes

export const createEditAddressView = (addressId: string): HTMLElement => {
  const customer = getState("customer");
  const address = customer?.addresses?.find((addr) => addr.id === addressId);

  if (!address) {
    return createElement("div", { class: "error-message" }, ["Address not found"]);
  }

  // Create form container
  const container = createElement("form", { class: "address-form" }, []);

  // Form fields
  const formFields = createElement("div", { class: "address-form__fields" }, []);

  // First name field
  const firstNameField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "firstName" }, ["First Name"]),
    createElement("input", {
      type: "text",
      id: "firstName",
      name: "firstName",
      value: address.firstName || "",
      required: "required",
    }),
  ]);

  // Last name field
  const lastNameField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "lastName" }, ["Last Name"]),
    createElement("input", {
      type: "text",
      id: "lastName",
      name: "lastName",
      value: address.lastName || "",
      required: "required",
    }),
  ]);

  // Street field
  const streetField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "streetName" }, ["Street"]),
    createElement("input", {
      type: "text",
      id: "streetName",
      name: "streetName",
      value: address.streetName || "",
      required: "required",
    }),
  ]);

  // Additional address info (optional)
  const additionalField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "additionalStreetInfo" }, ["Additional Info (optional)"]),
    createElement("input", {
      type: "text",
      id: "additionalStreetInfo",
      name: "additionalStreetInfo",
      value: address.additionalStreetInfo || "",
    }),
  ]);

  // City field
  const cityField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "city" }, ["City"]),
    createElement("input", {
      type: "text",
      id: "city",
      name: "city",
      value: address.city || "",
      required: "required",
    }),
  ]);

  // Postal code field
  const postalCodeField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "postalCode" }, ["Postal Code"]),
    createElement("input", {
      type: "text",
      id: "postalCode",
      name: "postalCode",
      value: address.postalCode || "",
      required: "required",
    }),
  ]);

  // Country field with all countries from countryCodes.json
  const countryOptions = [
    ...countryCodes.map((country) => {
      return createElement(
        "option",
        {
          value: country.value,
          selected: address.country === country.value ? "selected" : "",
        },
        [country.text]
      );
    }),
  ];

  const countryField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "country" }, ["Country"]),
    createElement(
      "select",
      {
        id: "country",
        name: "country",
        required: "required",
      },
      countryOptions
    ),
  ]);

  // Default address checkboxes with custom styling
  const isDefaultShipping = customer?.defaultShippingAddressId === address.id;
  const isDefaultBilling = customer?.defaultBillingAddressId === address.id;

  const defaultOptions = createElement("div", { class: "address-form__defaults" }, [
    createElement("label", { class: "custom-checkbox" }, [
      createElement("input", {
        type: "checkbox",
        name: "defaultShipping",
        checked: isDefaultShipping ? "checked" : "",
      }),
      createElement("span", { class: "checkmark" }, []),
      "Set as default shipping address",
    ]),
    createElement("label", { class: "custom-checkbox" }, [
      createElement("input", {
        type: "checkbox",
        name: "defaultBilling",
        checked: isDefaultBilling ? "checked" : "",
      }),
      createElement("span", { class: "checkmark" }, []),
      "Set as default billing address",
    ]),
  ]);

  // Hidden field for address ID
  const idField = createElement("input", {
    type: "hidden",
    name: "addressId",
    value: addressId,
  });

  // Add all fields to form
  formFields.append(
    idField,
    firstNameField,
    lastNameField,
    streetField,
    additionalField,
    cityField,
    postalCodeField,
    countryField,
    defaultOptions
  );

  // Action buttons
  const actionButtons = createElement("div", { class: "address-form__actions" }, [
    createElement("button", { class: "address-form__cancel-btn", type: "button" }, ["Cancel"], {
      events: {
        click: (e) => {
          e.preventDefault();
          const modalOverlay = (e.target as HTMLElement).closest(".modal-overlay");
          const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
          if (closeBtn) closeBtn.click();
        },
      },
    }),
    createElement("button", { class: "address-form__save-btn", type: "submit" }, ["Save Changes"]),
  ]);

  container.append(formFields, actionButtons);

  // Form submission handler
  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(container as HTMLFormElement);
    const addressData = {
      firstName: (formData.get("firstName") as string) || "",
      lastName: (formData.get("lastName") as string) || "",
      streetName: (formData.get("streetName") as string) || "",
      additionalStreetInfo: (formData.get("additionalStreetInfo") as string) || "",
      city: (formData.get("city") as string) || "",
      postalCode: (formData.get("postalCode") as string) || "",
      country: (formData.get("country") as string) || "",
      defaultShipping: formData.get("defaultShipping") === "on",
      defaultBilling: formData.get("defaultBilling") === "on",
    };

    // Get button reference BEFORE the try block
    const saveBtn = container.querySelector(".address-form__save-btn") as HTMLButtonElement;
    const originalText = saveBtn.textContent || "Save Changes";

    try {
      // Show loading state
      saveBtn.textContent = "Saving...";
      saveBtn.disabled = true;

      // Call the API to update the address
      await updateAddress(addressId, addressData);

      // Close the modal after successful update
      const modalOverlay = container.closest(".modal-overlay");
      const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
      if (closeBtn) closeBtn.click();

      // Refresh to show updated addresses
      location.reload();
    } catch (error: unknown) {
      console.error("Error updating address:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to update address: ${errorMessage}`);

      // Reset button
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  });

  return container;
};
