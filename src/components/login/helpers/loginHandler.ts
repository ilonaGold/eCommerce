import { LoginInfo } from "../../../interfaces/dataInterfaces";
import { goToView } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { storeLoginData } from "../../../services/localStorage/localStorage";
import { setAuth, setCustomer } from "../../../state/state";
import { notificationModal } from "../../notificationModal/notificationModal";

export const loginHandler = async (e: Event): Promise<void> => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) {
    notificationModal("Form not found", "error");
    return;
  }
  if (!form.checkValidity()) {
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData) as Record<string, string>;
  const { email, password } = data;

  try {
    const loginInfo: LoginInfo = await loginCustomer(email, password);
    // ----Handle customer data
    storeLoginData(loginInfo);
    setAuth(true);
    setCustomer(loginInfo.customer);
    // ----Handle customer data
    console.log("Logged In, choose redirect method");
    notificationModal("Logged In successfully", "success");
    goToView("home");

    form.reset();
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error orrucer.";
    notificationModal(message, "error");
  }
};
