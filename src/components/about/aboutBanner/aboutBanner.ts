import { createElement } from "../../../utils/dom/createElement";
import aboutPanda from "../../../assets/images/three-pandas.png";
import "./aboutBanner.css";

export function createAboutBanner(): HTMLElement {
  // Create banner container
  const imageContainer = createElement("div", { class: "about-image-container" }, [
    createElement("img", {
      src: aboutPanda,
      alt: "Three red pandas on stone steps",
      class: "about-panda-image",
    }),
  ]);

  return imageContainer;
}
