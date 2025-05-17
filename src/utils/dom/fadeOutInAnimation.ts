// Simple animation to hide Layout Shift
export const fadeOutInAnimation = (
  element: HTMLElement,
  changeCallback: () => void,
  duration = 500
): void => {
  // Create and inject styles once
  if (!document.getElementById("fade-style")) {
    const style = document.createElement("style");
    style.id = "fade-style";
    style.textContent = `
      .fade-transition {
      transition: opacity ${duration}ms ease;
      }
      .fade-hidden {
      opacity: 0;
      }
    `;

    // Cleanup classes after animation
    setTimeout(() => {
      element.classList.remove("fade-transition", "fade-hidden");
    }, duration * 2);
    document.head.appendChild(style);
  }

  // Ensure element has the transition class
  element.classList.add("fade-transition");

  // Fade out
  element.classList.add("fade-hidden");

  setTimeout(() => {
    // Apply changes while hidden
    changeCallback();

    // Fade in
    element.classList.remove("fade-hidden");
  }, duration);
};
