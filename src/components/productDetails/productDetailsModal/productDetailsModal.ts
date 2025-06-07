import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { imageSlider } from "../slider/slider";

import "./productDetailsModal.css";

export const modalWithSlider = (product: ProductProjection): void => {
  const modalOverlay = createElement("div", { class: "modal-overlay" });
  const modalWindow = createElement("div", { class: "modal-window" });
  modalOverlay.append(modalWindow);
  const slider = imageSlider(product);
  const closeButton = createElement("button", { class: "close-button" }, ["x"]);
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });
  modalWindow.append(slider, closeButton);
  document.body.append(modalOverlay);
};
