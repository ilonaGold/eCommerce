import { createElement } from "../../utils/dom/createElement";

type ModalType = "success" | "error";

export function notificationModal(message: string, type: ModalType): void {
  const colors = {
    success: {
      bg: "#d4edda",
      text: "#155724",
      border: "#c3e6cb",
    },
    error: {
      bg: "#f8d7da",
      text: "#721c24",
      border: "#f5c6cb",
    },
  };

  const modalOverlayStyles =
    type === "success"
      ? {
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "9999",
        }
      : {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "9999",
        };

  const modalOverlay = createElement("div", undefined, [], {
    classes: ["modal-overlay"],
    styles: modalOverlayStyles,
  });

  const modalBox = createElement("div", undefined, [], {
    classes: ["modal-box"],
    styles: {
      backgroundColor: colors[type].bg,
      color: colors[type].text,
      border: `1px solid ${colors[type].border}`,
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      minWidth: "300px",
      textAlign: "center",
      position: "relative",
    },
  });

  const closeButton = createElement("button", undefined, ["×"], {
    styles: {
      position: "absolute",
      top: "10px",
      right: "15px",
      backgroundColor: "transparent",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      color: colors[type].text,
    },
    events: {
      click: () => document.body.removeChild(modalOverlay),
    },
  });

  const messageParagraph = createElement("p", undefined, [message], {
    styles: {
      margin: "0",
      fontSize: "16px",
    },
  });

  modalBox.appendChild(closeButton);
  modalBox.appendChild(messageParagraph);
  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);

  setTimeout(() => {
    if (document.body.contains(modalOverlay)) {
      document.body.removeChild(modalOverlay);
    }
  }, 3000);
}
