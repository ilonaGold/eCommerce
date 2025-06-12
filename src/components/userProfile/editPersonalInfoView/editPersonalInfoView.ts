import { createElement } from "../../../utils/dom/createElement";
import { getState } from "../../../state/state";
import { updateCustomerInfo } from "../../../services/customerService/customerService";
import "./editPersonalInfoView.css";

export const createEditPersonalInfoView = (): HTMLElement => {
  const customer = getState("customer");

  // Create form container
  const container = createElement("form", { class: "edit-profile-form" }, []);

  // Form fields - create a grid layout for the form
  const formFields = createElement("div", { class: "edit-profile__fields" }, []);

  // First name field
  const firstNameField = createElement("div", { class: "edit-profile__field" }, [
    createElement("label", { for: "firstName" }, ["First Name"]),
    createElement("input", {
      type: "text",
      id: "firstName",
      name: "firstName",
      value: customer?.firstName || "",
      required: "required",
    }),
  ]);

  // Last name field
  const lastNameField = createElement("div", { class: "edit-profile__field" }, [
    createElement("label", { for: "lastName" }, ["Last Name"]),
    createElement("input", {
      type: "text",
      id: "lastName",
      name: "lastName",
      value: customer?.lastName || "",
      required: "required",
    }),
  ]);

  // Email field
  const emailField = createElement("div", { class: "edit-profile__field" }, [
    createElement("label", { for: "email" }, ["Email"]),
    createElement("input", {
      type: "email",
      id: "email",
      name: "email",
      value: customer?.email || "",
      required: "required",
    }),
  ]);

  // Date of birth field
  const dobField = createElement("div", { class: "edit-profile__field" }, [
    createElement("label", { for: "dateOfBirth" }, ["Date of Birth"]),
    createElement("input", {
      type: "date",
      id: "dateOfBirth",
      name: "dateOfBirth",
      value: customer?.dateOfBirth || "",
    }),
  ]);

  // Add fields to the form
  formFields.append(firstNameField, lastNameField, emailField, dobField);

  // Action buttons
  const actionButtons = createElement("div", { class: "edit-profile__actions" }, [
    createElement("button", { class: "edit-profile__cancel-btn", type: "button" }, ["Cancel"], {
      events: {
        click: (e) => {
          e.preventDefault();
          // Find the closest modal-overlay and simulate a click on its close button
          const modalOverlay = (e.target as HTMLElement).closest(".modal-overlay");
          const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
          if (closeBtn) closeBtn.click();
        },
      },
    }),
    createElement("button", { class: "edit-profile__save-btn", type: "submit" }, ["Save Changes"]),
  ]);

  container.append(formFields, actionButtons);

  // Form submission handler
  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(container as HTMLFormElement);
    const customerData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
    };

    // Get button reference BEFORE the try block
    const saveBtn = container.querySelector(".edit-profile__save-btn") as HTMLButtonElement;
    const originalText = saveBtn.textContent || "Save Changes";

    try {
      // Show loading state
      saveBtn.textContent = "Saving...";
      saveBtn.disabled = true;

      // Update customer information
      await updateCustomerInfo(customerData);

      // Close the modal after successful update
      const modalOverlay = container.closest(".modal-overlay");
      const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
      if (closeBtn) closeBtn.click();

      // Refresh the page to show updated info
      setTimeout(() => {
        location.reload();
      }, 300);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Failed to update profile: ${(error as Error).message}`);

      // Reset button
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  });

  return container;
};
