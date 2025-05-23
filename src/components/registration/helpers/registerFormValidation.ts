import { Fields } from "../../../interfaces/interfaces";
import {
  validateAge,
  validateCountry,
  validateEmail,
  validatePassword,
  validateRepeatPssw,
  validatePostcode,
  validateStreet,
  validateString,
  addValidation,
  updateError,
} from "../../../utils/dom/form/inputValidation";

export function validateRegistrationForm(form: HTMLFormElement): void {
  form.noValidate = true;
  const fields: Fields = {
    email: validateEmail,
    firstName: validateString,
    lastName: validateString,
    password: validatePassword,
    repeatPassword: validateRepeatPssw,
    dateOfBirth: validateAge,
    address: validateStreet,
    city: validateString,
    country: validateCountry,
    postalCode: validatePostcode,
    billingAddress: validateStreet,
    billingCity: validateString,
    billingCountry: validateCountry,
    billingPostalCode: validatePostcode,
  };

  for (const field in fields) {
    const input: HTMLInputElement | null = form.querySelector(`#${field}`);
    const error: HTMLDivElement | null = form.querySelector(`#${field}Error`);
    if (input && error) addValidation({ input: input, validate: fields[field], divError: error });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (const field in fields) {
      const input: HTMLInputElement | null = form.querySelector(`#${field}`);
      const error: HTMLDivElement | null = form.querySelector(`#${field}Error`);
      if (input && error) {
        const text = fields[field](input);
        updateError({ fieldInput: input, fieldError: error, text });
      }
    }
  });
}
