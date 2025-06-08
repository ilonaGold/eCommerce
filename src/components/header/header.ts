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

  const navList = createElement(
    "ul",
    { class: "nav-links" },
    navLinks.map((link) =>
      createElement("li", { class: "nav-item" }, [
        createElement(
          "a",
          {
            class: "nav-link",
            href: "#",
            "data-view": link.view,
          },
          [link.text],
          {
            events: {
              click: (e) => {
                e.preventDefault();
                closeMenu();
                goToView(link.view);
              },
            },
          }
        ),
      ])
    )
  );

  const hamburger = createElement("div", { class: "hamburger-menu" }, [
    createElement("span", { class: "hamburger-icon" }),
  ]);

  const controls = createElement("div", { class: "header-controls" }, [
    createElement("div", { class: "header-buttons" }, headerButtonChildren),
    hamburger,
  ]);

  const nav = createElement("nav", { class: "header-nav" }, [
    createElement("h1", { class: "logo" }, ["Red Panda Squad"], {
      events: { click: () => goToView("main") },
      styles: { cursor: "pointer" },
    }),
    navList,
    controls,
  ]);

  const header = createElement("header", { class: "header" }, [nav]);

  // Event logic
  function openMenu() {
    navList.classList.add("active");
    hamburger.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    navList.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (navList.classList.contains("active")) {
      closeMenu();
    }
  });

  return header;
}
