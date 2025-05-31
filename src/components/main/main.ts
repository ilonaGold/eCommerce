import { createElement } from "../../utils/dom/createElement";
import "./main.css";

export const mainComponent = (isLoggedIn: boolean, content?: HTMLElement): HTMLElement => {
  // Create the content container
  const contentElement =
    content ||
    createElement(
      "div",
      { class: "dummy-content" },
      [isLoggedIn ? "Protected content" : "Public content"],
      {
        styles: {
          color: isLoggedIn ? "green" : "blue",
        },
      }
    );

  // Create main section with proper structure
  return createElement("main", { class: "main" }, [
    createElement(
      "section",
      {},
      [createElement("div", {}, [contentElement], { classes: ["center", "hero-center"] })],
      {
        classes: ["hero", "hero-section"],
        styles: { height: "100%", fontSize: "2rem" },
      }
    ),
  ]);
};
