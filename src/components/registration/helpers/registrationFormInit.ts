import { fadeOutInAnimation } from "../../../utils/dom/fadeOutInAnimation";
import { registerHandler } from "./registerHandler";

export const registrationFormInit = (form: HTMLFormElement): HTMLFormElement => {
  const separateBillingCheckbox = form.querySelector<HTMLInputElement>("#separateBilling");
  const billingFields = form.querySelector<HTMLDivElement>("#billingFields");

  // single check
  if (billingFields && separateBillingCheckbox) {
    handleBillingCheckbox(billingFields, separateBillingCheckbox.checked);
  }

  separateBillingCheckbox?.addEventListener("change", () => {
    const isSeparateBillingChecked = separateBillingCheckbox?.checked || false;

    // continuous check
    if (billingFields) {
      fadeOutInAnimation(
        form,
        () => {
          handleBillingCheckbox(billingFields, isSeparateBillingChecked);
        },
        150
      );
    }
  });
  form.addEventListener("submit", registerHandler);
  return form;
};

// helper
function handleBillingCheckbox(billingFields: HTMLDivElement, isChecked: boolean): void {
  billingFields.style.display = isChecked ? "block" : "none";
  const inputs = billingFields.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    (input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).disabled = !isChecked;
  });
}
