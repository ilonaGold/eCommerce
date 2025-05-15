import { collectFormData } from "./collectFormData";

export function registerHandler(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  if (!form) {
    console.error("Form element not found.");
    return;
  }

  const data = collectFormData(form);
  console.log(data);
}
