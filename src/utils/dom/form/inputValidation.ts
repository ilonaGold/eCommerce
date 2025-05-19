import type { Rule } from "../../../interfaces/interfaces";

export function validateEmail(email: HTMLInputElement): string {
  const rules: Rule[] = [
    { test: () => email.validity.valueMissing, message: "Email is missing" },
    {
      test: () => email.validity.typeMismatch,
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
