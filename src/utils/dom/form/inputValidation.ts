import type { InputError, Rule, ValidationProps } from "../../../interfaces/interfaces";
import countryCodes from "../../../assets/data/countryCodes.json";
import postcodes from "../../../assets/data/postcodeFormats.json";

export function validateEmail(email: HTMLInputElement): string {
  const rules: Rule[] = [
    {
      test: () => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value),
      message: "Expected email format: username@example.com",
    },
    {
      test: () => /^(\s+)/.test(email.value) || /(\s+)$/.test(email.value),
      message: "Remove leading or trailing whitespaces",
    },
  ];
  for (const rule of rules) {
    if (rule.test()) return rule.message;
  }
  return "";
}

export function validatePassword(password: HTMLInputElement): string {
  const rules: Rule[] = [
    { test: () => password.validity.valueMissing, message: "Password is missing" },
    { test: () => password.value.length < 8, message: "Password should be min 8 characters long" },
    {
      test: () => !/[a-z]/.test(password.value),
      message: "Password must contain at least 1 lowercase letter",
    },
    {
      test: () => !/[A-Z]/.test(password.value),
      message: "Password must contain at least 1 uppercase letter",
    },
    {
      test: () => !/\d/.test(password.value),
      message: "Password must contain at least 1 digit",
    },
    {
      test: () => !/[^a-zA-Z0-9]/.test(password.value),
      message: "Password must contain at least 1 special character",
    },
    {
      test: () => /^(\s+)/.test(password.value) || /(\s+)$/.test(password.value),
      message: "Remove leading or trailing whitespaces",
    },
  ];
  for (const rule of rules) {
    if (rule.test()) return rule.message;
  }
  return "";
}

export function validateRepeatPssw(repeatPassword: HTMLInputElement): string {
  const password: HTMLInputElement | null = document.querySelector("#password");
  if (!password || !password.value) return "Password is missing";
  if (repeatPassword.value !== password.value) return "Password doesn't match";
  return "";
}

export function validateString(field: HTMLInputElement): string {
  const fieldName = field.name.replace(/([A-Z])/g, " $1").trim(); // Convert camelCase to spaced words
  const capitalizedName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1); // Capitalize first letter

  const rules: Rule[] = [
    {
      test: () => !/[a-zA-Z]/.test(field.value),
      message: `Please enter your ${fieldName.toLowerCase()}`, // More natural phrasing
    },
    {
      test: () => /\d/.test(field.value),
      message: `${capitalizedName} cannot contain numbers`,
    },
    {
      test: () => /[^a-zA-Z0-9]/.test(field.value),
      message: `${capitalizedName} cannot contain special characters`,
    },
  ];

  for (const rule of rules) {
    if (rule.test()) return rule.message;
  }
  return "";
}

export function validateAge(dateString: HTMLInputElement): string {
  const AGE = 13;
  const data = new Date(dateString.value);
  const now = new Date();
  const age = now.getFullYear() - data.getFullYear();
  const rules: Rule[] = [
    { test: () => dateString.validity.valueMissing, message: "Date is missing" },
    { test: () => age < AGE, message: `Min user's age is ${AGE} y.o.` },
  ];
  for (const rule of rules) {
    if (rule.test()) return rule.message;
  }
  return "";
}

export function validateStreet(street: HTMLInputElement): string {
  if (!/[a-zA-Z]/.test(street.value)) return "Street must contain at least 1 character";
  return "";
}

export function validateCountry(country: HTMLInputElement): string {
  let isFromList = false;
  for (const item of countryCodes) {
    if (item.value === country.value) isFromList = true;
  }
  if (!isFromList) return "Country must be chosen from the list";
  return "";
}

export function validatePostcode(postcode: HTMLInputElement): string {
  const country: HTMLInputElement | null = document.querySelector("#country");
  if (!country || !country.value) return "Choose country first";
  for (const item of postcodes) {
    if (item.value === country.value) {
      const pattern = typeof item.regex === "string" ? new RegExp(item.regex) : item.regex;
      if (pattern && pattern.test(postcode.value)) {
        return "";
      } else {
        return "Invalid postcode format for the chosen country";
      }
    }
  }
  return "";
}

export function updateError({ fieldInput, fieldError, text }: InputError): void {
  if (fieldError) fieldError.textContent = text;
  fieldInput.classList.toggle("invalid", text != "");
}

export function addValidation({ input, validate, divError }: ValidationProps): void {
  input.addEventListener("input", () => {
    const text = validate(input);
    updateError({ fieldInput: input, fieldError: divError, text: text });
  });
}
