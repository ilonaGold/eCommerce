export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Record<string, string>,
  children?: (Node | string)[],
  options?: {
    styles?: Partial<CSSStyleDeclaration>;
    classes?: string[];
    dataset?: Record<string, string>;
    events?: { [event: string]: EventListener };
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  if (children) {
    children.forEach((child) => {
      element.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
  }
  if (options?.styles) Object.assign(element.style, options.styles);
  if (options?.classes) element.classList.add(...options.classes);
  if (options?.dataset) {
    Object.entries(options.dataset).forEach(([key, value]) => {
      element.dataset[key] = value;
    });
  }
  if (options?.events) {
    Object.entries(options.events).forEach(([event, listener]) => {
      element.addEventListener(event, listener);
    });
  }
  return element;
}
