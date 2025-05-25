import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";
import { createHeader } from "../../components/header/header";
import { mainComponent } from "../../components/main/main";
import { createFooter } from "../../components/footer/footer";

import "./renderMain.css";

export function renderMain(parent: HTMLElement): void {
  const isAuth = getState("userAuth");

  const viewContainer = createElement("div", { class: "view-container" }, [
    createHeader(),
    mainComponent(isAuth),
    createFooter(),
  ]);

  parent.append(viewContainer);
}
