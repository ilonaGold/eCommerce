import { createElement } from "../../../utils/dom/createElement";
import "./addAddressView.css";
import "../../../styles/styles.css";

export const createAddAddressView = (): HTMLElement => {
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
    }),
  ]);

  // City field
  const cityField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "city" }, ["City"]),
    createElement("input", {
      type: "text",
      id: "city",
      name: "city",
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
      required: "required",
    }),
  ]);

  // Country field (dropdown)
  const countryField = createElement("div", { class: "address-form__field" }, [
    createElement("label", { for: "country" }, ["Country"]),
    createElement(
      "select",
      {
        id: "country",
        name: "country",
        required: "required",
      },
      [
        createElement("option", { value: "" }, ["Select a country"]),
        createElement("option", { value: "US" }, ["United States"]),
        createElement("option", { value: "GB" }, ["United Kingdom"]),
        createElement("option", { value: "DE" }, ["Germany"]),
        createElement("option", { value: "FR" }, ["France"]),
        // Add more countries as needed
      ]
    ),
  ]);

  // Default address checkboxes
  const defaultOptions = createElement("div", { class: "address-form__defaults" }, [
    createElement("label", { class: "custom-checkbox" }, [
      createElement("input", {
        type: "checkbox",
        name: "defaultShipping",
      }),
      createElement("span", { class: "checkmark" }, []),
      "Set as default shipping address",
    ]),
    createElement("label", { class: "custom-checkbox" }, [
      createElement("input", {
        type: "checkbox",
        name: "defaultBilling",
      }),
      createElement("span", { class: "checkmark" }, []),
      "Set as default billing address",
    ]),
  ]);

  // Add all fields to form
  formFields.append(
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
    createElement("button", { class: "address-form__save-btn", type: "submit" }, ["Add Address"]),
  ]);

  container.append(formFields, actionButtons);

  // Form submission handler
  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(container as HTMLFormElement);
    const addressData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      streetName: formData.get("streetName") as string,
      additionalStreetInfo: (formData.get("additionalStreetInfo") as string) || undefined,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      defaultShipping: formData.get("defaultShipping") === "on",
      defaultBilling: formData.get("defaultBilling") === "on",
    };

    // Get button reference BEFORE the try block
    const saveBtn = container.querySelector(".address-form__save-btn") as HTMLButtonElement;
    const originalText = saveBtn.textContent || "Add Address";

    try {
      // Show loading state
      saveBtn.textContent = "Adding...";
      saveBtn.disabled = true;

      // Your team will implement this
      console.log("Adding address:", addressData);

      // Just for show
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close the modal after successful update
      const modalOverlay = container.closest(".modal-overlay");
      const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
      if (closeBtn) closeBtn.click();

      // This will be replaced by your team's implementation
      alert("Address added successfully!");
    } catch (error) {
      console.error("Error adding address:", error);
      alert(`Failed to add address: ${(error as Error).message}`);

      // Reset button
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  });

  return container;
};
