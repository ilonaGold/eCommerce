import { createElement } from "../../utils/dom/createElement";
import { Customer } from "../../interfaces/dataInterfaces";
import { createHeading } from "./heading/heading";
import { createNavBar } from "./navBar/navBar";

import "./header.css";
import { createHeaderControls } from "./headerControls/headerControls";
import { initiateHeader } from "./helpers/initiateHeader";

export function createHeader(isLoggedIn: boolean, customer: Customer | null): HTMLElement {
  const heading = createHeading();

  const navBar = createNavBar();

  const controls = createHeaderControls(isLoggedIn, customer);

  const headerContent = createElement("div", { class: "header-content" }, [
    heading,
    navBar,
    controls,
  ]);

  const header = createElement("header", { class: "header" }, [headerContent]);

  initiateHeader(header);

  return header;
}
