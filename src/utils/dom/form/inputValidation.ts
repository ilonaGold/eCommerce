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
