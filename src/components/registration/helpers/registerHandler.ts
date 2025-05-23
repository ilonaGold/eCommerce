import { LoginInfo } from "../../../interfaces/dataInterfaces";
import { navigateTo } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { registerCustomer } from "../../../services/auth/registerCustomer";
import { storeLoginData } from "../../../services/localStorage/localStorage";
import { setState } from "../../../state/state";
import { notificationModal } from "../../notificationModal/notificationModal";
import { createCustomerDraft } from "./createCustomerDraft";

export async function registerHandler(event: Event): Promise<void> {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  try {
    const data = createCustomerDraft(form);
    const { email, password } = data;

    await registerCustomer(data);
    const customerData = (await loginCustomer(email, password)) as LoginInfo;
    console.log(
      "After registration, log in happens also, but 'silently', because we need toredirect after"
    );
    // +++++++++++++++++++++++   Updatind state / Saving in localStorage (needs separate module)  ++++++++++++++++++++++++++++++
    setState("userAuth", true);
    setState("customer", customerData.customer);
    storeLoginData(customerData);
    navigateTo("/");
    // +++++++++++++++++++++++   Updatind state / Saving in localStorage (needs separate module)   ++++++++++++++++++++++++++++++
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      notificationModal(error.message, "error");
    } else {
      console.log(error);
    }
  }
}
