import { Routes } from "../interfaces/interfaces";
import { getState, setView, setAuth } from "../state/state";
import { createElement } from "../utils/dom/createElement";
import { renderLogin } from "../views/renderLogin/renderLogin";
import { renderRegistration } from "../views/renderRegistration/renderRegistration";
import { renderMain } from "../views/renderMain/renderMain";
import { renderError } from "../views/renderError/renderError";
import { isTokenValid } from "../services/auth/isTokenValid";
import { renderHome } from "../views/renderHome/renderHome";

const routes: Routes = {
  "/": "Log In",
  login: "Log In",
  main: "Main",
  registration: "Registration",
  home: "Home",
};

export function routeHandler(): void {
  const path = location.pathname;
  const LAST_INDEX = -1;
  const arr = path.split("/").filter(Boolean);
  let endpoint: string | undefined;
  if (arr.length) {
    endpoint = arr.at(LAST_INDEX);
  } else {
    endpoint = "/";
  }
  const isAuth = isTokenValid();
  setAuth(isAuth);
  if (endpoint && routes[endpoint]) {
    if (!isAuth) {
      setView(endpoint);
    } else {
      setView("main");
      if (endpoint !== "main") {
        const newPath = createNewPath("main");
        history.replaceState(null, "", newPath);
      }
    }
  } else {
    setView("error");
  }
  renderView();
}

function renderView(): void {
  const view = getState("view");
  let root: HTMLElement | null = document.querySelector("#root");
  if (root) {
    root.innerHTML = "";
  } else {
    root = createElement("div", { id: "root" });
    document.body.append(root);
  }
  switch (view) {
    case "/":
    case "login":
      renderLogin(root);
      break;
    case "registration":
      renderRegistration(root);
      break;
    case "home":
      renderHome(root);
      break;
    case "main":
      renderMain(root);
      break;
    default:
      renderError(root);
      break;
  }
}

export function goToView(view: string): void {
  const newPath = createNewPath(view);
  history.pushState({}, "", newPath);
  routeHandler();
}

export function createNewPath(view: string): string {
  const path = location.pathname;
  const arr = path.split("/").filter(Boolean);
  if (!arr.length) {
    arr.push(view);
  } else {
    arr[arr.length - 1] = view;
  }
  const newPath = `/${arr.join("/")}`;
  return newPath;
}
