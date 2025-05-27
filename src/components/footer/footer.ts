import { createElement } from "../../utils/dom/createElement";
import "./footer.css";

export function createFooter(): HTMLElement {
  const currentYear = new Date().getFullYear();

  const footerContent = createElement("div", { class: "center footer-center" }, [
    createElement("span", { class: "footer-year" }, [`©${currentYear}`]),
    createElement(
      "a",
      {
        href: "https://rs.school/courses/javascript",
        class: "footer-course",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      [
        createElement("img", {
          // Use the JS course specific logo
          src: "https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg",
          alt: "RSSchool logo",
          class: "footer-logo",
          width: "80",
          height: "80",
        }),
      ]
    ),
    createElement(
      "a",
      {
        href: "https://github.com/ilonaGold/eCommerce",
        class: "footer-link",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      ["RPS"]
    ),
  ]);

  return createElement("footer", { class: "footer" }, [footerContent]);
}
