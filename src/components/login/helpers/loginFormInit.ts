import { loginHandler } from "./loginHandler";

export const loginFormInit = (form: HTMLFormElement): void => {
  form.addEventListener("submit", loginHandler);
};
