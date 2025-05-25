import { createElement } from "../../utils/dom/createElement";
import "./header.css";
import { goToView } from "../../routing/router";
import { Customer } from "../../interfaces/dataInterfaces";
import { clearLoginData } from "../../services/localStorage/localStorage";
import { setAuth, setCustomer } from "../../state/state";

export function createHeader(isLoggedIn: boolean, customer: Customer | null): HTMLElement {
  const navLinks = [
    { text: "Home", view: "home" },
    { text: "About", view: "about" },
    { text: "Products", view: "main" },
    { text: "Contacts", view: "contacts" },
  ];

  const logOutBtn = createElement("a", {}, ["Log Out"], {
    events: {
      click: (e) => {
        e.preventDefault();
        setAuth(false);
        setCustomer(null);
        clearLoginData();
        goToView("main");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  const headerButtonChildren = isLoggedIn
    ? [`Welcome, ${customer?.firstName}`, " / ", logOutBtn]
    : [
        createElement(
          "button",
          {
            class: "header-btn login-btn",
            type: "button",
          },
          ["Sign In"],
          { events: { click: () => goToView("login") } }
        ),
        createElement(
          "button",
          {
            class: "header-btn register-btn",
            type: "button",
          },
          ["Register"],
          { events: { click: () => goToView("registration") } }
        ),
      ];

  const navigation = createElement("nav", { class: "header-nav" }, [
    createElement("h1", { class: "logo" }, ["Red Panda Squad"], {
      events: {
        click: () => {
          goToView("main");
        },
      },
      styles: {
        cursor: "pointer",
      },
    }),
    createElement(
      "ul",
      { class: "nav-links" },
      navLinks.map((link) =>
        createElement("li", { class: "nav-item" }, [
          createElement(
            "a",
            {
              class: "nav-link",
              href: "",
            },
            [link.text],
            { events: { click: () => goToView(`${link.view}`) } }
          ),
        ])
      )
    ),
    createElement("div", { class: "header-controls" }, [
      createElement("div", { class: "header-buttons" }, headerButtonChildren),
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
    const text = document.querySelector(".page-text");

    navLinks?.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    welcomeText?.classList.toggle("menu-open");
    mainContent?.classList.toggle("nav-open");
    text?.classList.toggle("open");
  });

  return createElement("header", { class: "header" }, [navigation]);
}
