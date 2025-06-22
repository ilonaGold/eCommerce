export const initiateDropDown = (userAccountComponent: HTMLElement): HTMLElement => {
  const dropdownTrigger = userAccountComponent.querySelector(".dropdown-trigger");

  const triggerClickHandler = (): void => {
    userAccountComponent.classList.toggle("dropdown-active");
  };
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", triggerClickHandler);
  }
  const outsideClickHandler = (event: Event): void => {
    if (!(event.target instanceof Element) || !event.target.closest(".user-account")) {
      const activeDropdown = document.querySelector(".dropdown-active");
      if (activeDropdown) {
        activeDropdown.classList.remove("dropdown-active");
      }
    }
  };
  document.addEventListener("click", outsideClickHandler);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.removedNodes.forEach((node) => {
        if (node === userAccountComponent) {
          if (dropdownTrigger) {
            dropdownTrigger.removeEventListener("click", triggerClickHandler);
          }
          document.removeEventListener("click", outsideClickHandler);
          observer.disconnect(); // Stop observing
        }
      });
    }
  });

  return userAccountComponent;
};
