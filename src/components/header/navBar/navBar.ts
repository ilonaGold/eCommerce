import { goToView } from "../../../routing/router";
import { createElement } from "../../../utils/dom/createElement";
import { closeMenu } from "../helpers/menuActions";

import "./navBar.css";

export const createNavBar = (): HTMLElement => {
  const navLinks = [
    { text: "Home", view: "" },
    { text: "About", view: "about" },
    { text: "Products", view: "products" },
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

  const nav = createElement("nav", { class: "nav" }, [navList]);

  return nav;
};
