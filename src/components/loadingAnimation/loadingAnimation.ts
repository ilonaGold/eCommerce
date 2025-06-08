import { createElement } from "../../utils/dom/createElement";
import "./loadingAnimation.css";

export const loadingAnimation = (): HTMLElement => {
  const loadingContainer = createElement("div", { class: "loading-container" }, [
    createElement("div", { class: "plant-loader" }, [
      createElement("div", { class: "stem" }, []),
      createElement("div", { class: "leaf leaf-1" }, []),
      createElement("div", { class: "leaf leaf-2" }, []),
      createElement("div", { class: "leaf leaf-3" }, []),
      createElement("div", { class: "leaf leaf-4" }, []),
    ]),
    createElement("p", { class: "loading-text" }, ["Growing your experience..."]),
  ]);

  return loadingContainer;
};
