import { goToView } from "../../../routing/router";
import { loginCustomer } from "../../../services/auth/loginCustomer";
import { notificationModal } from "../../notificationModal/notificationModal";

export const loginHandler = async (e: Event): Promise<void> => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) {
    notificationModal("Form not found", "error");
    return;
  }
  if (form.querySelector(".invalid") || !form.checkValidity()) {
    return;
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData) as Record<string, string>;
  const { email, password } = data;

  try {
    await loginCustomer(email, password);
    form.reset();
    console.log("Logged In, choose redirect method");
    notificationModal("Logged In successfully", "success");
    goToView("main");
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error orrucer.";
    notificationModal(message, "error");
  }
};
