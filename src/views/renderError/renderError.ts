import { createFooter } from "../../components/footer/footer";
import { createElement } from "../../utils/dom/createElement";

export function renderError(parent: HTMLElement): void {
  const info = createElement("div", { class: "error-info" }, [
    createElement("h3", { class: "error-header" }, ["Page not found"]),
    createElement("p", { class: "error-text" }, [
      "Sorry, we couldn't find the page you're looking for",
    ]),
    createElement("button", { class: "error-button" }, ["Go back to home"]),
  ]);

  const picture = createElement("div", { class: "error-info" }, [
    createElement("img", {
      src: "../../assets/images/panda-forest.png",
      alt: "Forest panda",
      class: "panda-image",
    }),
  ]);

  const section = createElement("section", { class: "error-section" }, [info, picture]);

  const container = createElement("main", { class: "error-main" }, [section, createFooter()]);
  parent.append(container);
}
