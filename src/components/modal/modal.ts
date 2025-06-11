import { createElement } from "../../utils/dom/createElement";
import "./modal.css";

export const createModal = (content: HTMLElement, title: string = ""): HTMLElement => {
  // Create overlay (background)
  const modalOverlay = createElement("div", { class: "modal-overlay" }, []);

  // Create modal container
  const modalContainer = createElement("div", { class: "modal-container" }, []);

  // Create header with title and close button
  const modalHeader = createElement("div", { class: "modal-header" }, [
    createElement("h3", { class: "modal-title" }, [title]),
    createElement("button", { class: "modal-close-btn", type: "button" }, ["×"]),
  ]);

  // Create content container and add the passed content
  const modalContent = createElement("div", { class: "modal-content" }, [content]);

  // Assemble all parts
  modalContainer.append(modalHeader, modalContent);
  modalOverlay.appendChild(modalContainer);

  // Close button functionality
  const closeBtn = modalContainer.querySelector(".modal-close-btn") as HTMLButtonElement;
  closeBtn.addEventListener("click", () => {
    closeModal(modalOverlay);
  });

  // Close on clicking outside the modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal(modalOverlay);
    }
  });

  // Add ESC key listener for closing modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && document.body.contains(modalOverlay)) {
      closeModal(modalOverlay);
    }
  });

  // Function to close the modal
  function closeModal(modal: HTMLElement) {
    // Add closing animation class
    modalContainer.classList.add("modal-closing");

    // Remove after animation completes
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }, 300);
  }

  // Show modal with animation
  setTimeout(() => {
    modalContainer.classList.add("modal-open");
  }, 10);

  return modalOverlay;
};

// Helper function to open a modal
export const openModal = (content: HTMLElement, title: string = ""): void => {
  const modal = createModal(content, title);
  document.body.appendChild(modal);
};
