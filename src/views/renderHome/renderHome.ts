import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import "./renderHome.css";

export function renderHome(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const imageContainer = createElement("div", { class: "home-image-container" }, [
    createElement("img", {
      src: "../../assets/images/sleeping-panda.png",
      alt: "Home panda",
      class: "home-panda-image",
    }),
    createElement("p", { class: "home-text" }, ["Relax while we're building this page for you"]),
  ]);
  const main = createElement("main", { class: "home-main" }, [imageContainer]);
  const container = createElement("main", { class: "home-container" }, [
    createHeader(isAuth, customer),
    main,
    createFooter(),
  ]);
  parent.append(container);
}
