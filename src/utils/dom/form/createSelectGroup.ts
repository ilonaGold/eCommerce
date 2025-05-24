import { createElement } from "../createElement";

export function createSelectGroup(
  labelText: string,
  name: string,
  options: Array<{ value: string; text: string }>,
  required = false
): HTMLElement {
  const select = createElement("select", {
    name,
    id: name,
    ...(required ? { required: "true" } : {}),
  });

  select.append(createElement("option", { value: "" }, ["-- Please select --"]));

  options.forEach(({ value, text }) => {
    select.append(createElement("option", { value }, [text]));
  });

  const errorMsg = createElement("div", {
    class: "error-message",
    id: `${name}Error`,
  });

  return createElement("div", { class: "form-group" }, [
    createElement("label", { for: name }, [labelText]),
    select,
    errorMsg,
  ]);
}
