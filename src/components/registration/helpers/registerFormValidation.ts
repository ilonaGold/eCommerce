import { updateError } from "../../../utils/dom/form/inputValidation";

export function addValidation(
  input: HTMLInputElement,
  validate: (input: HTMLInputElement) => string,
  divError: HTMLDivElement
): void {
  input.addEventListener("input", () => {
    const text = validate(input);
    updateError({ fieldInput: input, fieldError: divError, text: text });
  });
}
