import { ProductProjection } from "../../../interfaces/products/ProductProjection";
import { createElement } from "../../../utils/dom/createElement";
import { imageSlider } from "../slider/slider";

import "./productDetailsModal.css";

export const modalWithSlider = (product: ProductProjection): void => {
  const modalOverlay = createElement("div", { class: "modal-overlay" });
  const modalWindow = createElement("div", { class: "modal-window" });
  modalOverlay.append(modalWindow);

  const slider = imageSlider(product, "modal-slider");

  // Add keyboard navigation for closing the modal
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      document.body.removeChild(modalOverlay);
      // Remove the event listener when modal is closed
      document.removeEventListener("keydown", handleKeyDown);
    }
  };

  // Add the event listener when modal is opened
  document.addEventListener("keydown", handleKeyDown);

  const closeButton = createElement("button", { class: "close-button" }, ["×"]);
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
    document.removeEventListener("keydown", handleKeyDown);
  });

  modalWindow.append(slider, closeButton);
  document.body.append(modalOverlay);
};
