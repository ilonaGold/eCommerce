import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";
import RedPandaLogoImg from "../../../assets/images/red-panda-logo.png";

import "./heading.css";

export const createHeading = (): HTMLElement => {
  const title = createElement("h1", { class: "logo logo-text" }, ["Red Panda Squad"]);

  const logoImage = createElement("img", {
    class: "logo logo-image",
    src: RedPandaLogoImg,
    alt: "Red Panda Squad",
  });

  const heading = createElement("div", { class: "heading" }, [title, logoImage], {
    events: { click: () => goToView("") },
    styles: { cursor: "pointer" },
  });

  return heading;
};
