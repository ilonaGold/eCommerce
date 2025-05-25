import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import "./renderHome.css";

export function renderHome(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const main = createElement("main", { class: "home-main" }, [
    createElement("p", { class: "home-text" }, ["Relax, while we're building this page for you"]),
  ]);
  const container = createElement("main", { class: "home-container" }, [
    createHeader(isAuth, customer),
    main,
    createFooter(),
  ]);
  parent.append(container);
}
