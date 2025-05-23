import { goToView } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { registerCustomer } from "../../../services/auth/registerCustomer";
import { createCustomerDraft } from "./createCustomerDraft";
import { notificationModal } from "../../notificationModal/notificationModal";

export async function registerHandler(event: Event): Promise<void> {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }
  if (form.querySelector(".invalid") || !form.checkValidity()) {
    notificationModal("Form must be filled out correctly to continue", "error");
    return;
  }
  const data = createCustomerDraft(form);
  const { email, password } = data;

  await registerCustomer(data);
  await loginCustomer(email, password);
  console.log(
    "After registration, log in happens also, but 'silently', because we need to redirect after"
  );
  goToView("main");
}
