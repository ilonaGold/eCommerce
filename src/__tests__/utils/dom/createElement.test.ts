import { describe, it, expect } from "vitest";
import { createElement } from "../../../utils/dom/createElement";

describe("createElement utility", () => {
  it("should create an element with specified tag", () => {
    const div = createElement("div");
    expect(div.tagName).toBe("DIV");
  });

  it("should create an element with attributes", () => {
    const link = createElement("a", { href: "/test", class: "nav-link" });
    expect(link.getAttribute("href")).toBe("/test");
    expect(link.getAttribute("class")).toBe("nav-link");
  });

  it("should create an element with children", () => {
    const div = createElement("div", {}, ["Hello World"]);
    expect(div.textContent).toBe("Hello World");
  });

  it("should create an element with multiple children", () => {
    const span = createElement("span");
    span.textContent = "Child";
    const div = createElement("div", {}, ["Hello ", span, " World"]);
    expect(div.childNodes.length).toBe(3);
    expect(div.textContent).toBe("Hello Child World");
  });

  it("should add CSS classes using options", () => {
    const div = createElement("div", {}, [], { classes: ["nav-link", "active"] });
    expect(div.classList.contains("nav-link")).toBe(true);
    expect(div.classList.contains("active")).toBe(true);
  });

  it("should add styles using options", () => {
    const div = createElement("div", {}, [], {
      styles: { color: "red", fontSize: "16px" },
    });
    expect(div.style.color).toBe("red");
    expect(div.style.fontSize).toBe("16px");
  });

  it("should add dataset attributes", () => {
    const div = createElement("div", {}, [], {
      dataset: { testId: "my-test", value: "123" },
    });
    expect(div.dataset.testId).toBe("my-test");
    expect(div.dataset.value).toBe("123");
  });

  it("should add event listeners", () => {
    let clicked = false;
    const button = createElement("button", {}, [], {
      events: {
        click: () => {
          clicked = true;
        },
      },
    });

    button.click();
    expect(clicked).toBe(true);
  });

  it("should handle complex element creation", () => {
    const button = createElement("button", { type: "submit", id: "test-btn" }, ["Click me"], {
      classes: ["btn", "btn-primary"],
      styles: { padding: "10px" },
      dataset: { action: "submit" },
    });

    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("submit");
    expect(button.getAttribute("id")).toBe("test-btn");
    expect(button.textContent).toBe("Click me");
    expect(button.classList.contains("btn")).toBe(true);
    expect(button.classList.contains("btn-primary")).toBe(true);
    expect(button.style.padding).toBe("10px");
    expect(button.dataset.action).toBe("submit");
  });
});
