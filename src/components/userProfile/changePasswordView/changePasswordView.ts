import { createElement } from "../../../utils/dom/createElement";
import { changeCustomerPassword } from "../../../services/customerService/customerService";
import "./changePasswordView.css";

function togglePasswordVisibility(input: HTMLInputElement, button: HTMLButtonElement): void {
  // Toggle between password and text
  const type = input.type === "password" ? "text" : "password";
  input.type = type;

  // Update button icon/text based on password visibility
  button.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
}

export const createChangePasswordView = (): HTMLElement => {
  // Create form container
  const container = createElement("form", { class: "change-password-form" }, []);

  // Form fields layout
  const formFields = createElement("div", { class: "change-password__fields" }, []);

  // Current password field
  const currentPasswordField = createElement("div", { class: "change-password__field" }, [
    createElement("label", { for: "currentPassword" }, ["Current Password"]),
    createElement("div", { class: "password-input-container" }, [
      createElement("input", {
        type: "password",
        id: "currentPassword",
        name: "currentPassword",
        required: "required",
      }),
      createElement(
        "button",
        {
          class: "toggle-password-btn",
          type: "button",
          tabindex: "-1",
        },
        ["👁️"]
      ),
    ]),
  ]);

  // New password field
  const newPasswordField = createElement("div", { class: "change-password__field" }, [
    createElement("label", { for: "newPassword" }, ["New Password"]),
    createElement("div", { class: "password-input-container" }, [
      createElement("input", {
        type: "password",
        id: "newPassword",
        name: "newPassword",
        required: "required",
      }),
      createElement(
        "button",
        {
          class: "toggle-password-btn",
          type: "button",
          tabindex: "-1",
        },
        ["👁️"]
      ),
    ]),
  ]);

  // Confirm new password field
  const confirmPasswordField = createElement("div", { class: "change-password__field" }, [
    createElement("label", { for: "confirmPassword" }, ["Confirm New Password"]),
    createElement("div", { class: "password-input-container" }, [
      createElement("input", {
        type: "password",
        id: "confirmPassword",
        name: "confirmPassword",
        required: "required",
      }),
      createElement(
        "button",
        {
          class: "toggle-password-btn",
          type: "button",
          tabindex: "-1",
        },
        ["👁️"]
      ),
    ]),
  ]);

  formFields.append(currentPasswordField, newPasswordField, confirmPasswordField);

  // Action buttons
  const actionButtons = createElement("div", { class: "change-password__actions" }, [
    createElement("button", { class: "change-password__cancel-btn", type: "button" }, ["Cancel"], {
      events: {
        click: (e) => {
          e.preventDefault();
          // Close the modal
          const modalOverlay = (e.target as HTMLElement).closest(".modal-overlay");
          const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
          if (closeBtn) closeBtn.click();
        },
      },
    }),
    createElement("button", { class: "change-password__save-btn", type: "submit" }, [
      "Change Password",
    ]),
  ]);

  container.append(formFields, actionButtons);

  // Initialize password toggle functionality
  setTimeout(() => {
    const toggleButtons = container.querySelectorAll(".toggle-password-btn");

    toggleButtons.forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission

        const button = e.currentTarget as HTMLButtonElement;
        const inputContainer = button.closest(".password-input-container");
        const input = inputContainer?.querySelector("input") as HTMLInputElement;

        if (input) {
          togglePasswordVisibility(input, button);
        }
      });
    });
  }, 0);

  // Form submission handler
  container.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(container as HTMLFormElement);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Basic validation
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    // Password strength validation
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // Get button reference BEFORE the try block
    const saveBtn = container.querySelector(".change-password__save-btn") as HTMLButtonElement;
    const originalText = saveBtn.textContent || "Change Password";

    try {
      // Show loading state
      saveBtn.textContent = "Changing...";
      saveBtn.disabled = true;

      // Change the password
      await changeCustomerPassword(currentPassword, newPassword);

      // Close the modal after successful update
      const modalOverlay = container.closest(".modal-overlay");
      const closeBtn = modalOverlay?.querySelector(".modal-close-btn") as HTMLButtonElement;
      if (closeBtn) closeBtn.click();

      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert(`Failed to change password: ${(error as Error).message}`);

      // Reset button
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  });

  return container;
};
