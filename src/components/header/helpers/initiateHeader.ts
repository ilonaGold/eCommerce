import { closeMenu, openMenu } from "./menuActions";

export const initiateHeader = (header: HTMLElement): void => {
  const hamburger = header.querySelector(".hamburger-menu");
  const navBar = header.querySelector(".nav");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      if (navBar && navBar.querySelector(".active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (navBar && navBar.querySelector(".active")) {
      closeMenu();
    }
  });
};
