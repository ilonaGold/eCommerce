import { goToView } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { registerCustomer } from "../../../services/auth/registerCustomer";
import { createCustomerDraft } from "./createCustomerDraft";
import { notificationModal } from "../../notificationModal/notificationModal";
import { storeLoginData } from "../../../services/localStorage/localStorage";
import { setAuth, setCustomer } from "../../../state/state";

export async function registerHandler(event: Event): Promise<void> {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }
  if (!form.checkValidity()) {
    console.log("asdfasdfasdf");
    return;
  }
  const data = createCustomerDraft(form);
  const { email, password } = data;
  try {
    await registerCustomer(data);
    const loginInfo = await loginCustomer(email, password);
    // ----Handle customer data
    storeLoginData(loginInfo);
    setAuth(true);
    setCustomer(loginInfo.customer);
    // ----Handle customer data
    console.log("Logged In, choose redirect method");
    notificationModal("Logged In successfully", "success");
    goToView("");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      notificationModal(error.message, "error");
    } else {
      console.log(error);
    }
  }
}
