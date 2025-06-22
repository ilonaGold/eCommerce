import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";

import "./heading.css";

export const createHeading = (): HTMLElement => {
  const title = createElement("h1", { class: "logo logo-text" }, ["Red Panda Squad"]);

  const logoImage = createElement("img", {
    class: "logo logo-image",
    src: "../../assets/images/red-panda-logo.png",
    alt: "Red Panda Squad",
  });

  const heading = createElement("div", { class: "heading" }, [title, logoImage], {
    events: { click: () => goToView("") },
    styles: { cursor: "pointer" },
  });

  return heading;
};
