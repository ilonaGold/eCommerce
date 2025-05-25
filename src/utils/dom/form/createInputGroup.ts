import { createElement } from "../createElement";

export function createInputGroup(
  labelText: string,
  type: string,
  name: string,
  required = false
): HTMLElement {
  const input = createElement("input", {
    type,
    name,
    id: name,
    ...(required ? { required: "true" } : {}),
  });

  const errorMsg = createElement("div", {
    class: "error-message",
    id: `${name}Error`,
  });

  return createElement("div", { class: "input-group" }, [
    createElement("label", { for: name }, [labelText]),
    input,
    errorMsg,
  ]);
}

export function createSectionTitle(title: string): HTMLElement {
  return createElement("h2", { class: "section-title" }, [title]);
}
