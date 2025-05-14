export const registrationFormInit = (form: HTMLFormElement) => {
  const separateBillingCheckbox = form.querySelector<HTMLInputElement>("#separateBilling");
  const billingFields = form.querySelector<HTMLDivElement>("#billingFields");

  separateBillingCheckbox?.addEventListener("change", () => {
    if (billingFields) {
      billingFields.style.display = separateBillingCheckbox.checked ? "block" : "none";
    }
  });

  return form;
};
