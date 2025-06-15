import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";

import "./heading.css";

export const createHeading = (): HTMLElement => {
  const title = createElement("h1", { class: "logo" }, ["Red Panda Squad"]);

  const heading = createElement("div", { class: "heading" }, [title], {
    events: { click: () => goToView("") },
    styles: { cursor: "pointer" },
  });

  return heading;
};
