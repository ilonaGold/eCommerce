import type { Rule } from "../../../interfaces/interfaces";

export function validateEmail(email: HTMLInputElement): string {
  if (email.validity.valueMissing) {
    return "Email is missing";
  } else if (email.validity.typeMismatch) {
    return "Expected email format: username@example.com";
  } else if (/^(\s+)/.test(email.value) || /(\s+)$/.test(email.value)) {
    return "Remove leading or trailing whitespaces";
  } else {
    return "";
  }
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
      test: () => /^(\s+)/.test(password.value) || /(\s+)$/.test(password.value),
      message: "Remove leading or trailing whitespaces",
    },
  ];
  for (const rule of rules) {
    if (rule.test()) return rule.message;
  }
  return "";
}
