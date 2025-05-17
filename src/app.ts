// import { routeHandler } from "./routing/router";
import "./styles/styles.css";
import { createElement } from "./utils/dom/createElement";
import { renderLogin } from "./views/renderLogin/renderLogin";
// import { renderRegistration } from "./views/renderRegistration/renderRegistration";

const root = createElement("div", { id: "root" });

document.body.append(root);
if (root) {
  renderLogin(root);
  // renderRegistration(root);
}

// window.addEventListener("load", routeHandler);
// window.addEventListener("popstate", routeHandler);
