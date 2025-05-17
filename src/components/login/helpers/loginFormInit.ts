import { loginHandler } from "./loginHandler";

export const loginFormInit = (form: HTMLFormElement): HTMLFormElement => {
  form.addEventListener("submit", loginHandler);
  return form;
};
