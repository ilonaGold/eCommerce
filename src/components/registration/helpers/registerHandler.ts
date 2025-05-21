import { goToView } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { registerCustomer } from "../../../services/auth/registerCustomer";
import { createCustomerDraft } from "./createCustomerDraft";

export async function registerHandler(event: Event): Promise<void> {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  const data = createCustomerDraft(form);
  const { email, password } = data;

  await registerCustomer(data);
  await loginCustomer(email, password);
  console.log(
    "After registration, log in happens also, but 'silently', because we need toredirect after"
  );
  goToView("main");
}
