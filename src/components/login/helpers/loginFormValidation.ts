import { validateEmail, validatePassword } from "../../../utils/dom/form/inputValidation";
import type { InputError } from "../../../interfaces/interfaces";

export function validateLoginForm(form: HTMLFormElement): void {
  const email: HTMLInputElement | null = form.querySelector("#email");
  const emailError: HTMLDivElement | null = form.querySelector("#emailError");
  email?.addEventListener("input", () => {
    const text = validateEmail(email);
    updateError({ fieldInput: email, fieldError: emailError, text: text });
  });

  const password: HTMLInputElement | null = form.querySelector("#password");
  const passwordError: HTMLDivElement | null = form.querySelector("#passwordError");
  password?.addEventListener("input", () => {
    const text = validatePassword(password);
    updateError({ fieldInput: password, fieldError: passwordError, text: text });
  });
}

export function updateError({ fieldInput, fieldError, text }: InputError): void {
  if (fieldError) fieldError.textContent = text;
  fieldInput.classList.toggle("invalid", text != "");
}
