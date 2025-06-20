import { createElement } from "../../../utils/dom/createElement";
import { TEAM_MODAL } from "../../../assets/data/teamMembers";
import "./teamModal.css";

export function createTeamModal(): HTMLElement {
  // Create modal overlay
  const modalOverlay = createElement("div", { class: "team-modal-overlay" });

  // Create modal container
  const modal = createElement("div", { class: "team-modal" });

  // Create modal header
  const modalHeader = createElement("div", { class: "team-modal-header" });
  const modalTitle = createElement("h2", { class: "team-modal-title" }, [TEAM_MODAL.title]);
  const closeButton = createElement(
    "button",
    {
      class: "team-modal-close",
      "aria-label": "Close modal",
    },
    ["×"]
  );

  modalHeader.append(modalTitle, closeButton);

  // Create modal content
  const modalContent = createElement("div", { class: "team-modal-content" });
  modalContent.innerHTML = TEAM_MODAL.content;

  // Assemble modal
  modal.append(modalHeader, modalContent);
  modalOverlay.append(modal);

  // Close button event listener
  closeButton.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    // Wait for animation to finish before removing
    setTimeout(() => {
      const existingModal = document.querySelector(".team-modal-overlay");
      if (existingModal && existingModal.parentNode) {
        existingModal.parentNode.removeChild(existingModal);
      }
    }, 300);
  });

  // Close on outside click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeButton.click();
    }
  });

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.querySelector(".team-modal-overlay.active")) {
      closeButton.click();
    }
  });

  return modalOverlay;
}
