import { createFooter } from "../../components/footer/footer";
import { goToView } from "../../routing/router";
import { createElement } from "../../utils/dom/createElement";

import "./renderError.css";

export function renderError(parent: HTMLElement): void {
  const info = createElement("div", { class: "error-info" }, [
    createElement("div", { class: "error-info-container" }, [
      createElement("h1", { class: "error-header" }, ["Page not found"]),
      createElement("p", { class: "error-text" }, [
        "Sorry, we couldn't find the page you're looking for",
      ]),
      createElement("button", { class: "error-button" }, ["Back to home"], {
        events: { click: () => goToView("home") },
      }),
    ]),
  ]);

  const picture = createElement("div", { class: "error-image-container" }, [
    createElement("img", {
      src: "../../assets/images/hanging-panda.png",
      alt: "Forest panda",
      class: "error-panda-image",
    }),
  ]);

  const section = createElement("section", { class: "error-section" }, [info, picture]);
  const main = createElement("section", { class: "error-main" }, [section]);

  const container = createElement("main", { class: "error-container" }, [main, createFooter()]);
  parent.append(container);
}
