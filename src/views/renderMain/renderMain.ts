import { footerComponent } from "../../components/footer/footer";
import { headerComponent } from "../../components/header/header";
import { mainComponent } from "../../components/main/mainComponent";
import { getState } from "../../state/state";
import { createElement } from "../../utils/dom/createElement";

export function renderMain(parent: HTMLElement): void {
  const isAuth = getState("userAuth");
  const customer = getState("customer");

  const viewContainer = createElement("div", { class: "view-container" }, [
    headerComponent(isAuth, customer),
    mainComponent(isAuth),
    footerComponent(),
  ]);
  parent.append(viewContainer);
}
