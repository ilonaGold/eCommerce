import { createElement } from "../../utils/dom/createElement";
import { setView } from "../../state/state";
import "./header.css";

export function createHeader(): HTMLElement {
  const navLinks = [
    { text: "Home", view: "home" },
    { text: "About", view: "about" },
    { text: "Products", view: "products" },
    { text: "Contacts", view: "contacts" },
  ];

  const navigation = createElement("nav", { class: "header-nav" }, [
    createElement("h1", { class: "logo" }, ["Red Panda Squad"]),
    createElement(
      "ul",
      { class: "nav-links" },
      navLinks.map((link) =>
        createElement("li", { class: "nav-item" }, [
          createElement(
            "a",
            {
              class: "nav-link",
              href: "#",
              onclick: `goToView('${link.view}')`,
            },
            [link.text]
          ),
        ])
      )
    ),
    createElement("div", { class: "header-controls" }, [
      createElement("div", { class: "header-buttons" }, [
        createElement(
          "button",
          {
            class: "header-btn login-btn",
            type: "button",
            onclick: "goToView('login')",
          },
          ["Sign In"]
        ),
        createElement(
          "button",
          {
            class: "header-btn register-btn",
            type: "button",
            onclick: "goToView('registration')",
          },
          ["Register"]
        ),
      ]),
      createElement("div", { class: "hamburger-menu" }, [
        createElement("span", { class: "hamburger-icon" }, []),
      ]),
    ]),
  ]);

  // Add event listener to hamburger menu
  const hamburgerMenu = navigation.querySelector(".hamburger-menu");
  hamburgerMenu?.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const welcomeText = document.querySelector(".welcome-text");
    const mainContent = document.querySelector(".main-content");

    navLinks?.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    welcomeText?.classList.toggle("menu-open");
    mainContent?.classList.toggle("nav-open");
  });

  return createElement("header", { class: "header" }, [navigation]);
}
