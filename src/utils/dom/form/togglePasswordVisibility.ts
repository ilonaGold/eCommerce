export function togglePasswordVisibility(form: HTMLFormElement): void {
  const password: HTMLInputElement | null = form.querySelector("#password");
  const checkbox: HTMLInputElement | null = form.querySelector("#showPassword");
  if (!password || !checkbox) return;
  checkbox.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
}
