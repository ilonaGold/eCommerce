import {
  validateEmail,
  validatePassword,
  updateError,
} from "../../../utils/dom/form/inputValidation";

export function validateLoginForm(form: HTMLFormElement): void {
  form.noValidate = true;
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
