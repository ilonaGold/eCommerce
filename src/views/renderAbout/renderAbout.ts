import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";

import aboutPanda from "../../assets/images/three-pandas.webp";
import "./renderAbout.css";

export function renderAbout(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const imageContainer = createElement("div", { class: "about-image-container" }, [
    createElement("img", {
      src: aboutPanda,
      alt: "About panda",
      class: "about-panda-image",
    }),
    createElement("p", { class: "page-text" }, ["Relax while we're building this page for you"]),
  ]);
  const main = createElement("main", { class: "about-main" }, [imageContainer]);
  const container = createElement("main", { class: "about-container" }, [
    createHeader(isAuth, customer),
    main,
    createFooter(),
  ]);
  parent.append(container);
}
