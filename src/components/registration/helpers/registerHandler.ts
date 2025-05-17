import { registerCustomer } from "../../../services/auth/registerCustomer";
import { createCustomerDraft } from "./createCustomerDraft";

export function registerHandler(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  const data = createCustomerDraft(form);
  registerCustomer(data);
}
