import { createElement } from "../../utils/dom/createElement";
import "./footer.css";

export const footerComponent = (): HTMLElement => {
  const currentYear = new Date().getFullYear();

  const rsSchool = createElement(
    "a",
    { href: "https://rs.school/", target: "_blank", rel: "noopener noreferrer" },
    ["RS School"]
  );

  const copyright = createElement("span", {}, [`© ${currentYear}`]);

  const github = createElement(
    "a",
    {
      href: "https://github.com/ilonaGold/eCommerce",
      target: "_blank",
    },
    ["Website GH Repo"]
  );

  const footerContent = createElement("div", {}, [rsSchool, copyright, github], {
    classes: ["footer-center", "center"],
  });

  const footer = createElement("footer", { class: "footer" }, [footerContent]);

  return footer;
};
