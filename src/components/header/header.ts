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
  ];

  const logOutBtn = createElement("a", { class: "logout-btn" }, ["Log Out"], {
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

  const userProfileBtn = createElement("a", { class: "user-profile-link" }, ["User Profile"], {
    events: {
      click: (e) => {
        e.preventDefault();
        goToView("user-profile");
      },
    },
    styles: {
      cursor: "pointer",
    },
  });

  const headerButtonChildren = isLoggedIn
    ? [
        createElement("div", { class: "user-account" }, [
          createElement("div", { class: "welcome-message" }, [
            `Welcome, `,
            createElement("span", { class: "user-name" }, [customer?.firstName || "User"]),
          ]),
          createElement("div", { class: "user-controls" }, [userProfileBtn, logOutBtn]),
        ]),
      ]
    : [
        createElement("button", { class: "header-btn login-btn", type: "button" }, ["Sign In"], {
          events: { click: () => goToView("login") },
        }),
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
    const mainContent = document.querySelector(".main-content");
    const text = document.querySelector(".page-text");

    navLinks?.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    mainContent?.classList.toggle("nav-open");
    text?.classList.toggle("open");
  });

  return createElement("header", { class: "header" }, [navigation]);
}
