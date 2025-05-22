import { createElement } from "../../utils/dom/createElement";

import "./mainComponent.css";

export const mainComponent = (isLoggedIn: boolean): HTMLElement => {
  const dummyContent = isLoggedIn
    ? createElement("div", { class: "dummy-content" }, ["Protected content"], {
        styles: { color: "green" },
      })
    : createElement("div", { class: "dummy-content" }, ["Public content"], {
        styles: { color: "blue" },
      });

  return createElement("main", { class: "main" }, [
    createElement(
      "section",
      {},
      [createElement("div", {}, [dummyContent], { classes: ["center", "hero-center"] })],
      {
        classes: ["hero", "hero-section"],
        styles: { height: "100%", fontSize: "2rem" },
      }
    ),
  ]);
};
