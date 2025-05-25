import { createElement } from "../../utils/dom/createElement";
import { getState } from "../../state/state";
import { createHeader } from "../../components/header/header";
import { createFooter } from "../../components/footer/footer";
import "./renderContacts.css";

export function renderContacts(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");
  const imageContainer = createElement("div", { class: "contacts-image-container" }, [
    createElement("img", {
      src: "../../assets/images/contact-panda.png",
      alt: "Contacts panda",
      class: "contacts-panda-image",
    }),
    createElement("p", { class: "page-text" }, ["Relax while we're building this page for you"]),
  ]);
  const main = createElement("main", { class: "contacts-main" }, [imageContainer]);
  const container = createElement("main", { class: "contacts-container" }, [
    createHeader(isAuth, customer),
    main,
    createFooter(),
  ]);
  parent.append(container);
}
