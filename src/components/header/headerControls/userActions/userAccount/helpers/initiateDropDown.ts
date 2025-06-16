export const initiateDropDown = (userAccountComponent: HTMLElement) => {
  const dropdownTrigger = userAccountComponent.querySelector(".dropdown-trigger");

  const triggerClickHandler = () => {
    userAccountComponent.classList.toggle("dropdown-active");
  };
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener("click", triggerClickHandler);
  }
  const outsideClickHandler = (event: Event) => {
    if (!(event.target instanceof Element) || !event.target.closest(".user-account")) {
      const activeDropdown = document.querySelector(".dropdown-active");
      if (activeDropdown) {
        activeDropdown.classList.remove("dropdown-active");
      }
      return;
    }
  };
  document.addEventListener("click", outsideClickHandler);

  userAccountComponent.addEventListener("DOMNodeRemoved", (event) => {
    if (event.target === userAccountComponent) {
      if (dropdownTrigger) {
        dropdownTrigger.removeEventListener("click", triggerClickHandler);
      }
      document.removeEventListener("click", outsideClickHandler);
    }
  });

  return userAccountComponent;
};
