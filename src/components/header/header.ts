import { createElement } from "../../utils/dom/createElement";

export const headerComponent = (): HTMLElement => {
  const headingContainer = createElement("div", { class: "heading-container" }, ["RedPandaSquad"]);
  const navBar = createElement("nav", { class: "navbar" }, [
    /*all links we'll need to put later */
  ]);
  const userActions = createElement("div", { class: "user-actions" }, ["login/register"]);

  const header = createElement("header", { class: "header" }, [
    createElement("div", { class: "header-center" }, [headingContainer, navBar, userActions]),
  ]);

  return header;
};
