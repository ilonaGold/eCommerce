export const openMenu = (): void => {
  const navList = document.querySelector(".nav-links") as HTMLElement | null;
  const hamburger = document.querySelector(".hamburger-menu") as HTMLElement | null;
  if (navList) {
    navList.classList.add("active");
  }

  if (hamburger) {
    hamburger.classList.add("active");
  }
  document.body.classList.add("menu-open");
};

export const closeMenu = (): void => {
  const navList = document.querySelector(".nav-links") as HTMLElement | null;
  const hamburger = document.querySelector(".hamburger-menu") as HTMLElement | null;
  if (navList) {
    navList.classList.remove("active");
  }
  if (hamburger) {
    hamburger.classList.remove("active");
  }
  document.body.classList.remove("menu-open");
};
